'use client';

import { PlatformShowcase } from '@/components/showcase/PlatformShowcase';
import { FeaturesPlatform } from '@/components/blocks/features-platform';
import { StepsTimeline } from '@/components/howItWorks/StepsTimeline';
import { UseCaseCards } from '@/components/useCases/UseCaseCards';
import { MetricsCounter } from '@/components/trust/MetricsCounter';
import { FinalCTA } from '@/components/cta/FinalCTA';
import { ScrollRevealInit } from '@/components/ScrollRevealInit';

export function ClientPage() {
  return (
    <>
      <ScrollRevealInit />
      <PlatformShowcase />
      <FeaturesPlatform />
      <StepsTimeline />
      <UseCaseCards />
      <MetricsCounter />
      <FinalCTA />
    </>
  );
}
