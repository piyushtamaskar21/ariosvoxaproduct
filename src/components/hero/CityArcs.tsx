'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// City positions on a sphere of radius ~2.8
const CITIES: { name: string; lat: number; lng: number }[] = [
  { name: 'New York', lat: 40.7, lng: -74 },
  { name: 'London', lat: 51.5, lng: -0.1 },
  { name: 'Dubai', lat: 25.2, lng: 55.3 },
  { name: 'Mumbai', lat: 19.1, lng: 72.9 },
  { name: 'Singapore', lat: 1.3, lng: 103.8 },
  { name: 'Tokyo', lat: 35.7, lng: 139.7 },
  { name: 'São Paulo', lat: -23.5, lng: -46.6 },
  { name: 'Amsterdam', lat: 52.4, lng: 4.9 },
  { name: 'Sydney', lat: -33.9, lng: 151.2 },
];

// City pair connections
const CONNECTIONS = [
  [0, 1], // New York ↔ London
  [1, 2], // London ↔ Dubai
  [2, 3], // Dubai ↔ Mumbai
  [3, 4], // Mumbai ↔ Singapore
  [4, 5], // Singapore ↔ Tokyo
  [5, 6], // Tokyo ↔ São Paulo
  [6, 0], // São Paulo ↔ New York
  [7, 8], // Amsterdam ↔ Sydney
];

const GLOBE_RADIUS = 2.8;

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function createArcCurve(start: THREE.Vector3, end: THREE.Vector3, height = 0.6): THREE.CubicBezierCurve3 {
  const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
  const midLen = mid.length();
  mid.normalize().multiplyScalar(midLen + height);
  // Use quadratic bezier via a CubicBezierCurve3 with doubled control point
  const c1 = new THREE.Vector3().lerpVectors(start, mid, 0.5);
  const c2 = new THREE.Vector3().lerpVectors(mid, end, 0.5);
  return new THREE.CubicBezierCurve3(start, c1, c2, end);
}

function CityArcMeshes({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  const { scene } = useThree();

  const arcData = useMemo(() => {
    return CONNECTIONS.map(([a, b]) => {
      const start = latLngToVec3(CITIES[a].lat, CITIES[a].lng, GLOBE_RADIUS);
      const end = latLngToVec3(CITIES[b].lat, CITIES[b].lng, GLOBE_RADIUS);
      const curve = createArcCurve(start, end, 0.8);
      const points = curve.getPoints(80);
      const tubeGeo = new THREE.TubeGeometry(
        new THREE.CubicBezierCurve3(start, start.clone(), end.clone(), end).getPoints(2),
        1, 0.003, 4, false
      );
      return { start, end, curve, points, tubeGeo };
    });
  }, []);

  const arcLineRefs = useRef<THREE.Line[]>([]);
  const dotRefs = useRef<THREE.Mesh[]>([]);

  // Create line arcs
  const lineGeometries = useMemo(() => {
    return CONNECTIONS.map(([a, b]) => {
      const start = latLngToVec3(CITIES[a].lat, CITIES[a].lng, GLOBE_RADIUS);
      const end = latLngToVec3(CITIES[b].lat, CITIES[b].lng, GLOBE_RADIUS);
      const curve = createArcCurve(start, end, 0.8);
      return new THREE.BufferGeometry().setFromPoints(curve.getPoints(128));
    });
  }, []);

  // City glow dots
  const cityDots = useMemo(() => {
    return CITIES.map((city) => latLngToVec3(city.lat, city.lng, GLOBE_RADIUS + 0.02));
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Animate dashed lines
    arcLineRefs.current.forEach((line, i) => {
      if (!line) return;
      const mat = line.material as THREE.LineDashedMaterial;
      if (mat) {
        mat.dashOffset = -t * 0.3;
        mat.needsUpdate = true;
      }
      // Staggered appearance
      const fadeIn = Math.max(0, Math.min(1, (t - i * 0.3) / 1.5));
      mat.opacity = fadeIn * 0.6;
    });

    // Pulse city dots
    dotRefs.current.forEach((dot, i) => {
      if (!dot) return;
      const pulse = 1 + Math.sin(t * 2 + i * 0.8) * 0.3;
      dot.scale.setScalar(pulse);
      (dot.material as THREE.MeshStandardMaterial).emissiveIntensity = 0.5 + Math.sin(t * 2 + i) * 0.3;
    });
  });

  return (
    <group ref={groupRef}>
      {/* Connection arcs - dashed lines */}
      {lineGeometries.map((geo, i) => (
        <line key={`arc-${i}`} ref={(el) => { arcLineRefs.current[i] = el!; }}>
          <primitive object={geo} />
          <lineDashedMaterial
            color="#22D3EE"
            dashSize={0.15}
            gapSize={0.1}
            linewidth={1}
            transparent
            opacity={0}
          />
        </line>
      ))}

      {/* City dots */}
      {cityDots.map((pos, i) => (
        <mesh key={`dot-${i}`} ref={(el) => { dotRefs.current[i] = el!; }} position={pos}>
          <sphereGeometry args={[0.035, 16, 16]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#22D3EE"
            emissiveIntensity={0.8}
            transparent
            opacity={0.9}
          />
        </mesh>
      ))}
    </group>
  );
}

export function CityArcs({ groupRef }: { groupRef: React.RefObject<THREE.Group> }) {
  return <CityArcMeshes groupRef={groupRef} />;
}
