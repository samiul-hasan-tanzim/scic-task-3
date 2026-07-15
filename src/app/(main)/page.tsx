import Features from "@/components/Home/features";
import Hero from "@/components/Home/Hero";
import Integrations from "@/components/Home/Integrations";
import Stats from "@/components/Home/stats";
import Testimonials from "@/components/Home/Testimonials";
import FAQ from "@/components/Home/FAQ";
import CTA from "@/components/Home/CTA";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <Testimonials />
      <Integrations />
      <FAQ />
      <CTA />
    </div>
  );
}
