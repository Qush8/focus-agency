import { Hero } from "@/components/sections/Hero";
import { Service } from "@/components/sections/Service";
import { About } from "@/components/sections/About";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      <Hero />
      <Service />
      <About />
    </main>
  );
}
