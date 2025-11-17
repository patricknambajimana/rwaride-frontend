import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItworks";
import Benefits from "@/components/Benefits";
import Safety from "@/components/Safety";
import CTASection from "@/components/CTASection";

export default function Home() {
  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-between">
      <Hero />
      <HowItWorks />
      <Benefits />
      <Safety />
      <CTASection />
    </main>
  );
}
