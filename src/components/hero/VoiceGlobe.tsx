'use client';

import { useRef, useMemo } from 'react';
import { useFrame, type ThreeElements } from '@react-three/fiber';
import * as THREE from 'three';

const GLOBE_RADIUS = 2.5;

const CITIES = [
  { lat: 40.7, lng: -74 },   // New York
  { lat: 51.5, lng: -0.1 },  // London
  { lat: 25.2, lng: 55.3 },  // Dubai
  { lat: 19.1, lng: 72.9 },  // Mumbai
  { lat: 1.3, lng: 103.8 },  // Singapore
  { lat: 35.7, lng: 139.7 }, // Tokyo
  { lat: -23.5, lng: -46.6 },// São Paulo
  { lat: 52.4, lng: 4.9 },   // Amsterdam
  { lat: -33.9, lng: 151.2 },// Sydney
];

const CONNECTIONS: [number, number][] = [
  [0, 1], // New York ↔ London
  [1, 2], // London ↔ Dubai
  [2, 3], // Dubai ↔ Mumbai
  [3, 4], // Mumbai ↔ Singapore
  [4, 5], // Singapore ↔ Tokyo
  [5, 6], // Tokyo ↔ São Paulo
  [6, 0], // São Paulo ↔ New York
  [7, 8], // Amsterdam ↔ Sydney
];

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function createArcPoints(start: THREE.Vector3, end: THREE.Vector3, height: number, segments: number): THREE.Vector3[] {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(GLOBE_RADIUS + height * dist);

  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3(
      (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * mid.x + t * t * end.x,
      (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * mid.y + t * t * end.y,
      (1 - t) * (1 - t) * start.z + 2 * (1 - t) * t * mid.z + t * t * end.z
    );
    points.push(p);
  }
  return points;
}

// ─── Globe Surface Shader ───
const globeVertShader = `
  varying vec3 vNormal;
  varying vec3 vPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const globeFragShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vNormal;
  varying vec3 vPosition;

  // Simplex noise
  vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
  vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
  vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
  float snoise(vec3 v){
    const vec2 C=vec2(1.0/6.0,1.0/3.0);
    const vec4 D=vec4(0.0,0.5,1.0,2.0);
    vec3 i=floor(v+dot(v,C.yyy));
    vec3 x0=v-i+dot(i,C.xxx);
    vec3 g=step(x0.yzx,x0.xyz);
    vec3 l=1.0-g;
    vec3 i1=min(g.xyz,l.zxy);
    vec3 i2=max(g.xyz,l.zxy);
    vec3 x1=x0-i1+C.xxx;
    vec3 x2=x0-i2+C.yyy;
    vec3 x3=x0-D.yyy;
    i=mod289(i);
    vec4 p=permute(permute(permute(
      i.z+vec4(0.0,i1.z,i2.z,1.0))
      +i.y+vec4(0.0,i1.y,i2.y,1.0))
      +i.x+vec4(0.0,i1.x,i2.x,1.0));
    float n_=0.142857142857;
    vec3 ns=n_*D.wyz-D.xzx;
    vec4 j=p-49.0*floor(p*ns.z*ns.z);
    vec4 x_=floor(j*ns.z);
    vec4 y_=floor(j-7.0*x_);
    vec4 x=x_*ns.x+ns.yyyy;
    vec4 y=y_*ns.x+ns.yyyy;
    vec4 h=1.0-abs(x)-abs(y);
    vec4 b0=vec4(x.xy,y.xy);
    vec4 b1=vec4(x.zw,y.zw);
    vec4 s0=floor(b0)*2.0+1.0;
    vec4 s1=floor(b1)*2.0+1.0;
    vec4 sh=-step(h,vec4(0.0));
    vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
    vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
    vec3 p0=vec3(a0.xy,h.x);
    vec3 p1=vec3(a0.zw,h.y);
    vec3 p2=vec3(a1.xy,h.z);
    vec3 p3=vec3(a1.zw,h.w);
    vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
    p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
    vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
    m=m*m;
    return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
  }

  void main() {
    vec3 baseColor = vec3(0.03, 0.08, 0.35);
    float n = snoise(vPosition * 1.8 + uTime * 0.05) * 0.5 + 0.5;
    float continent = smoothstep(0.45, 0.58, n);
    vec3 landColor = vec3(0.06, 0.15, 0.5);
    vec3 oceanColor = vec3(0.03, 0.08, 0.35);
    vec3 surfaceColor = mix(oceanColor, landColor, continent * 0.6);

    float breathe = sin(uTime * 0.6) * 0.5 + 0.5;
    surfaceColor += vec3(0.1, 0.12, 0.4) * breathe * 0.2;

    vec3 viewDir = normalize(cameraPosition - vPosition);
    float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
    fresnel = pow(fresnel, 2.5);

    vec3 rimColor = vec3(0.3, 0.5, 1.0);
    rimColor = mix(rimColor, vec3(0.13, 0.83, 0.93), fresnel * 0.6);

    vec3 finalColor = surfaceColor + rimColor * fresnel * 1.5;
    float alpha = mix(0.85, 1.0, fresnel) * uOpacity;

    gl_FragColor = vec4(finalColor, alpha);
  }
`;

// ─── Atmosphere Glow Shader ───
const atmosVertShader = `
  varying vec3 vNormal;
  varying vec3 vViewPosition;
  varying vec3 vWorldPosition;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    vViewPosition = (viewMatrix * vec4(position, 1.0)).xyz;
    vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosFragShader = `
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vWorldPosition;

  void main() {
    vec3 viewDir = normalize(cameraPosition - vWorldPosition);
    float fresnel = 1.0 - max(dot(viewDir, vNormal), 0.0);
    fresnel = pow(fresnel, 3.5);

    float breathe = sin(uTime * 0.6) * 0.5 + 0.5;
    vec3 innerColor = mix(vec3(0.38, 0.40, 0.95), vec3(0.13, 0.83, 0.93), breathe * 0.4);

    gl_FragColor = vec4(innerColor, fresnel * 0.6);
  }
`;

// ─── Connection Arc Shader ───
const arcVertShader = `
  varying vec2 vUv;
  varying float vDist;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const arcFragShader = `
  uniform float uTime;
  uniform float uDelay;
  uniform vec3 uColorStart;
  uniform vec3 uColorEnd;
  varying vec2 vUv;

  void main() {
    float t = mod(uTime * 0.4 + uDelay, 1.0);
    float packet = smoothstep(t - 0.08, t, vUv.x) * smoothstep(t + 0.12, t + 0.04, vUv.x);

    vec3 color = mix(uColorStart, uColorEnd, vUv.x);
    float alpha = packet * 0.9 + 0.06;

    gl_FragColor = vec4(color, alpha);
  }
`;

function VoiceGlobeCore() {
  const globeRef = useRef<THREE.Mesh>(null!);
  const atmosRef = useRef<THREE.Mesh>(null!);
  const groupRef = useRef<THREE.Group>(null!);
  const arcRefs = useRef<(THREE.Line | null)[]>([]);

  useFrame((_state, delta) => {
    const t = _state.clock.getElapsedTime();
    if (globeRef.current) globeRef.current.rotation.y += delta * 0.08;
    if (atmosRef.current) atmosRef.current.rotation.y -= delta * 0.03;
  });

  const cityDots = useMemo(() => {
    return CITIES.map((c) => latLngToVec3(c.lat, c.lng, GLOBE_RADIUS + 0.03));
  }, []);

  const arcData = useMemo(() => {
    return CONNECTIONS.map(([a, b], i) => {
      const start = latLngToVec3(CITIES[a].lat, CITIES[a].lng, GLOBE_RADIUS);
      const end = latLngToVec3(CITIES[b].lat, CITIES[b].lng, GLOBE_RADIUS);
      const pts = createArcPoints(start, end, 0.5, 64);
      return { pts, delay: i * 0.15 };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {/* Main globe */}
      <mesh ref={globeRef} scale={[1, 1, 1]}>
        <sphereGeometry args={[GLOBE_RADIUS, 128, 128]} />
        <shaderMaterial
          vertexShader={globeVertShader}
          fragmentShader={globeFragShader}
          uniforms={{
            uTime: { value: 0 },
            uOpacity: { value: 1.0 },
          }}
          side={THREE.FrontSide}
          transparent
        />
      </mesh>

      {/* Atmosphere glow shell */}
      <mesh ref={atmosRef} scale={[1.15, 1.15, 1.15]}>
        <sphereGeometry args={[GLOBE_RADIUS, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosVertShader}
          fragmentShader={atmosFragShader}
          uniforms={{ uTime: { value: 0 } }}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          transparent
          depthWrite={false}
        />
      </mesh>

      {/* City glowing dots */}
      {cityDots.map((pos, i) => (
        <CityDot key={i} position={pos} phase={i * 0.7} delay={i * 0.2} />
      ))}

      {/* Connection arcs */}
      {arcData.map((arc, i) => (
        <ConnectionArc key={i} points={arc.pts} delay={arc.delay} />
      ))}

      {/* Orbital rings */}
      <OrbitalRings />

      {/* Subtle wireframe grid */}
      <mesh>
        <sphereGeometry args={[GLOBE_RADIUS + 0.01, 36, 36]} />
        <meshBasicMaterial color="#4F46E5" wireframe transparent opacity={0.025} />
      </mesh>
    </group>
  );
}

function CityDot({
  position,
  phase,
  delay,
}: {
  position: THREE.Vector3;
  phase: number;
  delay: number;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const dotRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const p = Math.max(0, (t - delay) / 0.8);
    const eased = 1 - Math.pow(1 - Math.min(p, 1), 3);
    if (ref.current) {
      ref.current.scale.setScalar(eased);
      ref.current.position.copy(position);
    }
    if (dotRef.current) {
      const pulse = 1 + Math.sin(t * 2 + phase) * 0.4;
      dotRef.current.scale.setScalar(pulse * eased);
    }
  });

  return (
    <group ref={ref}>
      {/* Main dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.04, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.9} />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.08, 16, 16]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.15} blending={THREE.AdditiveBlending} />
      </mesh>
    </group>
  );
}

function ConnectionArc({
  points,
  delay,
}: {
  points: THREE.Vector3[];
  delay: number;
}) {
  const lineRef = useRef<THREE.Line>(null!);
  const glowLineRef = useRef<THREE.Line>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (lineRef.current) {
      const mat = lineRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms?.uTime) mat.uniforms.uTime.value = t;
    }
    if (glowLineRef.current) {
      const mat = glowLineRef.current.material as THREE.ShaderMaterial;
      if (mat.uniforms?.uTime) mat.uniforms.uTime.value = t;
    }
  });

  return (
    <>
      {/* Glowing arc */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={arcVertShader}
          fragmentShader={arcFragShader}
          uniforms={{
            uTime: { value: 0 },
            uDelay: { value: delay },
            uColorStart: { value: new THREE.Color(0x22d3ee) },
            uColorEnd: { value: new THREE.Color(0x6366f1) },
          }}
          transparent
          depthWrite={false}
        />
      </line>
      {/* Brighter glow overlay */}
      <line ref={glowLineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={arcVertShader}
          fragmentShader={arcFragShader}
          uniforms={{
            uTime: { value: 0 },
            uDelay: { value: delay },
            uColorStart: { value: new THREE.Color(0x22d3ee) },
            uColorEnd: { value: new THREE.Color(0x6366f1) },
          }}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          opacity={0.3}
        />
      </line>
    </>
  );
}

function OrbitalRings() {
  const r1 = useRef<THREE.Mesh>(null!);
  const r2 = useRef<THREE.Mesh>(null!);

  useFrame((_state, delta) => {
    if (r1.current) r1.current.rotation.z += delta * 0.15;
    if (r2.current) r2.current.rotation.z -= delta * 0.1;
  });

  return (
    <group>
      <mesh ref={r1} rotation={[0.4, 0, 0]}>
        <torusGeometry args={[4.2, 0.008, 8, 200]} />
        <meshBasicMaterial color="#4F46E5" transparent opacity={0.35} />
      </mesh>
      <mesh ref={r2} rotation={[0.9, 0, 0]}>
        <torusGeometry args={[5.5, 0.006, 8, 200]} />
        <meshBasicMaterial color="#22D3EE" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

export function VoiceGlobeScene() {
  const groupRef = useRef<THREE.Group>(null!);
  const mouseRef = useRef({ x: 0, y: 0 });

  useFrame((_, delta) => {
    const t = _.clock.getElapsedTime();
    // Update shader uniforms
    if (groupRef.current) {
      groupRef.current.traverse((child: any) => {
        if (child.material?.uniforms?.uTime) {
          child.material.uniforms.uTime.value = t;
        }
      });
      // Mouse parallax tilt
      const tx = mouseRef.current.x * 0.15;
      const ty = -mouseRef.current.y * 0.1;
      groupRef.current.rotation.x += (ty - groupRef.current.rotation.x) * 0.02;
      groupRef.current.rotation.z += (tx - groupRef.current.rotation.z) * 0.02;
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerMove={(e) => {
        mouseRef.current = { x: e.pointer.x, y: e.pointer.y };
      }}
    >
      <VoiceGlobeCore />
    </group>
  );
}
