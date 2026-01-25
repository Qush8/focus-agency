"use client";
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import "../../app/globals.css";

export const Navbar = () => {
  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!logoRef.current || !linksRef.current || !langRef.current) return;

    // Set initial opacity to 1 to ensure elements are visible
    gsap.set([logoRef.current, linksRef.current?.children, langRef.current?.children], {
      opacity: 1,
      visibility: "visible"
    });

    const ctx = gsap.context(() => {
      const links = Array.from(linksRef.current?.children || []);
      const langLinks = Array.from(langRef.current?.children || []);

      // Set initial state for animation
      gsap.set(logoRef.current, { opacity: 0, x: -20 });
      gsap.set(links, { opacity: 0, y: -10 });
      gsap.set(langLinks, { opacity: 0, x: 20 });

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      tl.to(logoRef.current, {
        opacity: 1,
        x: 0,
        duration: 0.6
      })
      .to(links, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.1
      }, "-=0.3")
      .to(langLinks, {
        opacity: 1,
        x: 0,
        duration: 0.5,
        stagger: 0.1
      }, "-=0.4");
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={navRef} className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className=" h-[125px] w-full max-w-[1920px] flex justify-between items-center">
        <div ref={logoRef} className="logo h-full text-xl font-bold text-[white] flex items-center">
          <img 
            src="/images/focus_agency_logo.svg" 
            alt="FocusAgency Logo" 
            className="h-full w-auto"
          />
        </div>
        <div ref={linksRef} className="nav-links flex h-full items-center opacity-100">
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">We are</a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">Services</a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">Blog</a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">Contact</a>
        </div>
        <div ref={langRef} className="language-links h-full flex items-center opacity-100">
          <a href="#" className="text-[white] text-12">ქართ</a>
          <a href="#" className="text-[white] text-12">ENG</a>
        </div>
      </nav>
    </div>
  );
};
