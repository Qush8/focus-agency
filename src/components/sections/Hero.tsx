"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';

gsap.registerPlugin(ScrollTrigger);

interface SocialIconProps {
  icon: string;
  size?: number;
  className?: string;
}

const SocialIcon = ({ icon, size = 20, className = '' }: SocialIconProps) => (
  <div className={`social-icon-wrapper w-[44px] h-[44px] border border-[#464646] rounded-lg flex items-center justify-center hover:border-[#F43E46] transition-[border-color] duration-300 group cursor-pointer bg-black ${className}`}>
    <img 
      src={icon} 
      alt="" 
      style={{ width: `${size}px`, height: `${size}px` }}
      className="transition-[filter] duration-300 brightness-0 invert" 
    />
  </div>
);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    // Always set initial hidden state for all elements
    gsap.set('.hero-text-inner, .hero-heading-inner', { y: "100%" });
    gsap.set('.hero-button-wrapper', { scale: 0, opacity: 0 });
    gsap.set('.left-icon, .right-icon', { scale: 0, opacity: 0, y: 20 });

    // Entrance timeline - plays once on page load (no ScrollTrigger)
    // This animation completes before scroll-out can interfere
    const tl = gsap.timeline({
      defaults: { duration: 0.6, ease: "power2.inOut" },
      delay: 0.1,
      onComplete: () => {
        // Ensure entrance animation is fully complete before scroll-out takes over
        // This prevents conflicts between the two timelines
      }
    });

    // Paragraph animation (1) - starts immediately
    tl.to('.hero-text-inner', { y: 0 }, 0.1);

    // Heading divs animation with stagger (2, 3, 4) - starts at 0.1s
    tl.to('.hero-heading-inner', { 
      y: 0,
      stagger: 0.1
    }, 0.2);

    // Button animation - starts after h1 completes (~0.3s)
    // h1 completes at: 0.1 (start) + 0.1 (stagger) + 0.6 (duration) = ~0.8s
    // But we want it to start slightly before h1 fully completes for smooth flow
    tl.to('.hero-button-wrapper', { 
      scale: 1, 
      opacity: 1 
    }, 0.3);

    // Left icons animation - starts after button (~0.5s)
    // Button completes at: 0.3 + 0.6 = 0.9s
    // Start left icons at 0.5s so they appear while button is still animating
    tl.to('.left-icon', { 
      scale: 1,
      opacity: 1,
      y: 0,
      stagger: 0.1 // Sequential appearance
    }, 0.4);

    // Right icon animation - starts after left icons complete (~0.9s)
    // Left icons: 4 icons * 0.1 stagger = 0.4s, starts at 0.5s, completes at ~0.9s
    tl.to('.right-icon', { 
      scale: 1, 
      opacity: 1, 
      y: 0 
    }, 0.7);

    // Clear entrance animation properties after completion to prevent conflicts with scroll-out
    tl.call(() => {
      // Entrance animation is complete, now scroll-out can take full control
      // No need to clear props as scroll-out will animate from current state
    });

    // Scroll-out timeline - scrubs with scroll position
    // Starts when user starts scrolling down
    const scrollOutTl = gsap.timeline({
      paused: false, // Allow ScrollTrigger to control it
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 0%", // Starts when Hero top reaches viewport bottom (immediately on scroll)
        end: "bottom 40%", // Ends when Hero bottom reaches viewport top
        scrub: true, // Direct scrubbing (no lag)
        invalidateOnRefresh: true
      },
      defaults: { ease: "none" }
    });

    // Animate text elements with mask animation (reverse of entrance, sequential)
    // Entrance: paragraph first, then headings with stagger
    // Scroll-out: paragraph first, then headings with stagger (reverse order)
    // Paragraph disappears first (as it appeared first)
    scrollOutTl.to('.hero-text-inner', {
      y: "-100%"
    }, 0);

    // Heading divs disappear with stagger (as they appeared with stagger)
    scrollOutTl.to('.hero-heading-inner', {
      y: "-100%",
      stagger: 0.4
    }, 0.1);

    // Button disappears (after text)
    scrollOutTl.to('.hero-button-wrapper', {
      scale: 0,
      opacity: 0
    }, 1);

    // Left icons disappear with stagger (as they appeared with stagger)
    scrollOutTl.to('.left-icon', {
      scale: 0,
      opacity: 0,
      stagger: 0.1
    }, 1.3);

    // Right icon disappears last (as it appeared last)
    scrollOutTl.to('.right-icon', {
      scale: 0,
      opacity: 0
    }, 1.5);

  }, { scope: heroRef });

  return (
    <section ref={heroRef} className="section-hero w-full flex flex-col items-start bg-[black] h-[100vh] ">
      <div className="text-[white] text-[48px] line-height-[100px] font-light tracking-normal">
        <div className="overflow-hidden block h-fit py-1">
          <span className="hero-text-inner block pb-1">Increase your sales</span>
        </div>
      </div>
      <h1 className="text-[white]">
        <div>
          <div className="overflow-hidden block h-fit py-1">
            <span className="hero-heading-inner block pb-1">Increase your sales and</span>
          </div>
        </div>
        <div>
          <div className="overflow-hidden block h-fit py-1">
            <span className="hero-heading-inner block pb-1">brand awareness with</span>
          </div>
        </div>
        <div>
          <div className="overflow-hidden block h-fit py-1">
            <span className="hero-heading-inner block pb-1">the <span className="font-[700]">FocusAgency</span> team</span>
          </div>
        </div>
      </h1>
      <div className="hero-button-wrapper hero-button mt-[44px]">
        <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] '} text={'SCHEDULE A MEETING'} onClick={() => {console.log('clicked')}} />
      </div>
      <div className='icons flex justify-between w-[100%] mt-[198px] '>
        <div className='left-side-icons w-[40%] flex justify-start gap-[24px]'>
            <SocialIcon icon="/icons/tweet.svg" className="left-icon" />
            <SocialIcon icon="/icons/insta.svg" className="left-icon" />
            <SocialIcon icon="/icons/face.svg" className="left-icon" />
            <SocialIcon icon="/icons/gmail.svg" className="left-icon" />
        </div>
        <div className='right-side-icons w-[40%] flex justify-end'>
          <SocialIcon icon="/icons/pause.svg" size={15} className="right-icon" />
        </div>
      </div>
    </section>
  );
};
