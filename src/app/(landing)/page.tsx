"use client";

import { useState, useEffect } from "react";
import { Entry } from "@/components/sections/Entry";
import { Hero } from "@/components/sections/Hero";
import { Service } from "@/components/sections/Service";
import { About } from "@/components/sections/About";

const VISITED_KEY = "hasVisited";
const SOUND_PREFERENCE_KEY = "soundPreference";

export default function LandingPage() {
  const [showEntry, setShowEntry] = useState(false);
  const [animationsReady, setAnimationsReady] = useState(false);

  useEffect(() => {
    // Always show Entry on page load/refresh
    setShowEntry(true);
    
    // COMMENTED: localStorage logic for future use
    // Uncomment below if you want Entry to show only on first visit
    /*
    const hasVisited = localStorage.getItem(VISITED_KEY);
    if (!hasVisited) {
      setShowEntry(true);
    }
    */
  }, []);

  const handleEnter = (soundPreference: 'on' | 'off') => {
    sessionStorage.setItem(SOUND_PREFERENCE_KEY, soundPreference);
    
    // COMMENTED: Save visit to localStorage
    // Uncomment if using first-visit logic
    // localStorage.setItem(VISITED_KEY, 'true');
    
    setShowEntry(false);
    
    // Trigger animations after Entry exits
    setTimeout(() => {
      setAnimationsReady(true);
      // Trigger navbar animations via custom event
      window.dispatchEvent(new CustomEvent('entryComplete'));
    }, 100);
  };

  return (
    <main className="flex min-h-screen flex-col">
      {/* Entry Overlay - conditional rendering */}
      {showEntry && <Entry onEnter={handleEnter} />}
      
      {/* Main Content - always in DOM for SEO */}
      <Hero animationsReady={animationsReady} />
      <Service />
      <About />
    </main>
  );
}
