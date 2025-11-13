import Hero from "@/component/Hero";
import HowItWorks from "@/component/HowItworks";
import Benefits from "@/component/Benefits";
import Safety from "@/component/Safety";
import CTASection from "@/component/CTASection";

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
