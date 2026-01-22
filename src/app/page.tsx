import { Hero } from "@/components/sections/Hero";
import { Service } from "@/components/sections/Service";
import { About } from "@/components/sections/About";
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col border border-[orange] ">
      <Hero />
      <Service />
      <About />
    </main>
  );
}