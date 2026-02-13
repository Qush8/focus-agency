"use client";

import { Hero } from "@/components/sections/Hero";
import { Service } from "@/components/sections/Service";
import { About } from "@/components/sections/About";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Main Content - always in DOM for SEO */}
      <Hero />
      <Service />
      <About />
    </main>
  );
}
