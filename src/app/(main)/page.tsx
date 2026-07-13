import Features from "@/components/Home/features";
import Hero from "@/components/Home/Hero";
import Integrations from "@/components/Home/Integrations";
import Stats from "@/components/Home/stats";

export default function Home() {
  return (
    <div>
      <Hero />
      <Stats />
      <Features />
      <Integrations />
    </div>
  );
}