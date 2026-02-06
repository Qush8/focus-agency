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
      gsap.set('.hero-text-inner, .hero-heading-inner', { y: '100%' });
      gsap.set('.hero-button-wrapper', { scale: 0, opacity: 0 });
      gsap.set('.left-icon, .right-icon', { scale: 0, opacity: 0, y: 20 });
      gsap.set('.left-side-line, .right-side-line', {
        scaleY: 0,
        transformOrigin: 'top',
      });
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

      tl.to('.hero-text-inner', { y: 0 }, 0.1);

      tl.fromTo(
        '.left-side-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 1.2 },
        0.1,
      );

      tl.to(
        '.hero-heading-inner',
        { y: 0, stagger: 0.1 },
        0.2,
      );

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

      tl.to('.hero-button-wrapper', { scale: 1, opacity: 1 }, 0.3);

      tl.fromTo(
        '.logo-right-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1 },
        0.35,
      );

      tl.to('.nav-links .nav-item-inner', { y: 0 }, 0.4);

      tl.to('.left-icon', {
        scale: 1,
        opacity: 1,
        y: 0,
        stagger: 0.1,
      }, 0.4);

      tl.fromTo(
        '.languages-left-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1 },
        0.5,
      );

      tl.to('.language-links .nav-item-inner', { y: 0 }, 0.6);

      tl.to('.right-icon', { scale: 1, opacity: 1, y: 0 }, 0.7);

      tl.fromTo(
        '.right-side-line',
        { scaleY: 0, transformOrigin: 'top' },
        { scaleY: 1, duration: 0.65 },
        0.85,
      );

      tl.call(() => {
        gsap.set('.hero-text-inner, .hero-heading-inner', { clearProps: 'y' });
        gsap.set('.hero-button-wrapper', { clearProps: 'scale,opacity' });
        gsap.set('.left-icon, .right-icon', { clearProps: 'scale,opacity,y' });
        gsap.set('.left-side-line, .right-side-line', {
          clearProps: 'transform',
        });
        gsap.set('.logo-f', { clearProps: 'opacity' });
        gsap.set('.logo-ball', { clearProps: 'scale' });
        gsap.set('.nav-item-inner', { clearProps: 'y' });
        gsap.set('.logo-right-line, .languages-left-line', {
          clearProps: 'transform',
        });
        gsap.set('.navbar-bottom-line', { clearProps: 'transform' });
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
