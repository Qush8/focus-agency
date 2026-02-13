'use client';

import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { Navbar } from './Navbar';

interface PageEntranceProps {
  children: React.ReactNode;
}

export const PageEntrance = ({ children }: PageEntranceProps) => {
  const pageEntranceRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Initial states for Navbar elements
      gsap.set('.logo-f', { opacity: 0 });
      gsap.set('.logo-ball', { scale: 0 });
      gsap.set('.nav-links .nav-item-inner, .language-links .nav-item-inner', {
        y: '100%',
      });
      gsap.set('.logo-right-line, .languages-left-line', {
        scaleY: 0,
        transformOrigin: 'top',
      });
      gsap.set('.navbar-bottom-line', {
        scaleX: 0,
        transformOrigin: 'left',
      });

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power2.out' },
        delay: 0.1,
      });

      tl.fromTo(
        '.navbar-bottom-line',
        { scaleX: 0, transformOrigin: 'left' },
        { scaleX: 1, duration: 0.85 },
        0.2,
      );

      tl.fromTo('.logo-f', { opacity: 0 }, { opacity: 1 }, 0.2);

      tl.fromTo(
        '.logo-ball',
        { scale: 0 },
        { scale: 1 },
        0.3,
      );

      tl.fromTo(
        '.logo-right-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1 },
        0.35,
      );

      tl.to('.nav-links .nav-item-inner', { y: 0 }, 0.4);

      tl.fromTo(
        '.languages-left-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1 },
        0.5,
      );

      tl.to('.language-links .nav-item-inner', { y: 0 }, 0.6);

      tl.call(() => {
        gsap.set('.nav-item-inner', { clearProps: 'y' });
      });
    },
    { scope: pageEntranceRef },
  );

  return (
    <div ref={pageEntranceRef}>
      <Navbar />
      {children}
    </div>
  );
};
