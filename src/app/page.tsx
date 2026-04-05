import { HeroSection } from "@/components/hero/HeroSection";
import { LiveProofTicker } from "@/components/ticker/LiveProofTicker";
import { ProblemGrid } from "@/components/problem/ProblemGrid";
import { ClientPage } from "./client-page";

export default function Home() {
  return (
    <>
      <HeroSection />
      <LiveProofTicker />
      <ProblemGrid />
      <ClientPage />
    </>
  );
}
