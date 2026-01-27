"use client";
import React, { useRef, useState, useEffect } from 'react';
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
  const [isNavFinished, setIsNavFinished] = useState(false);

  useEffect(() => {
    const handleReady = () => setIsNavFinished(true);
    window.addEventListener('navbarReady', handleReady);
    return () => window.removeEventListener('navbarReady', handleReady);
  }, []);

  useGSAP(() => {
    // Always set initial hidden state for all elements
    gsap.set('.hero-text-inner, .hero-heading-inner', { y: "100%" });
    gsap.set('.hero-button-wrapper', { y: 20, opacity: 0 });
    gsap.set('.left-icon, .right-icon', { scale: 0, opacity: 0, y: 20 });

    // Only create timeline and ScrollTrigger after Navbar is ready
    if (!isNavFinished) return;

    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: "power2.inOut" },
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true
      }
    });

    // Paragraph animation (1)
    tl.to('.hero-text-inner', { y: 0 });

    // Heading divs animation with stagger (2, 3, 4)
    tl.to('.hero-heading-inner', { 
      y: 0,
      stagger: 0.1
    }, "+=0.1");

    // Button animation (5)
    tl.to('.hero-button-wrapper', { 
      y: 0, 
      opacity: 1 
    }, "+=0.1");

    // Left icons animation with stagger (6, 7, 8, 9)
    tl.to('.left-icon', { 
      scale: 1,
      opacity: 1,
      y: 0,
      // stagger: 0.1
    }, "+=0.1");

    // Right icon animation (10)
    tl.to('.right-icon', { 
      scale: 1, 
      opacity: 1, 
      y: 0 
    }, "+=0.1");

  }, { scope: heroRef, dependencies: [isNavFinished] });

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
