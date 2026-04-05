'use client';

import { PlatformShowcase } from '@/components/showcase/PlatformShowcase';
import { StepsTimeline } from '@/components/howItWorks/StepsTimeline';
import { GlobalGlobe } from '@/components/useCases/GlobalGlobe';
import { UseCaseCards } from '@/components/useCases/UseCaseCards';
import { MetricsCounter } from '@/components/trust/MetricsCounter';
import { FinalCTA } from '@/components/cta/FinalCTA';

export function ClientPage() {
  return (
    <>
      <PlatformShowcase />
      <StepsTimeline />
      <GlobalGlobe />
      <UseCaseCards />
      <MetricsCounter />
      <FinalCTA />
    </>
  );
}
