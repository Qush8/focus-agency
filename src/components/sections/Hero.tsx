"use client";
import React, { useRef, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';
import { useLanguage } from '@/context/LanguageContext';
import GalaxyAnimation from './GalaxyAnimation';

gsap.registerPlugin(ScrollTrigger);

interface SocialIconProps {
  icon: string;
  size?: number;
  className?: string;
}

const SocialIcon = ({ icon, size = 20, className = '' }: SocialIconProps) => (
  <div className={`social-icon-wrapper w-[44px] h-[44px] border border-[#464646] rounded-[2px] flex items-center justify-center hover:border-[#F43E46] transition-[border-color] duration-300 ease-in-out group cursor-pointer bg-black ${className}`}>
    <div 
      style={{ 
        width: `${size}px`, 
        height: `${size}px`,
        maskImage: `url(${icon})`,
        maskRepeat: 'no-repeat',
        maskPosition: 'center',
        maskSize: 'contain',
        WebkitMaskImage: `url(${icon})`,
        WebkitMaskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        WebkitMaskSize: 'contain'
      }}
      className="bg-[#FFFFFF] block relative group-hover:bg-[#F43E46] transition-colors duration-300 ease-in-out" 
    />
  </div>
);

interface HeroProps {
  animationsReady?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ animationsReady = false }) => {
  const heroRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const hasAnimated = useRef(false);

  useGSAP(() => {
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

    // Button disappears (after text) — opacity only
    scrollOutTl.to('.hero-button-inner', {
      y: "-100%",
      opacity: 0,
      duration: 0.4,
      delay: 0.15
    }, 0.9);

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

  // Entrance animation - trigger only when Entry exits
  useEffect(() => {
    if (animationsReady && !hasAnimated.current) {
      hasAnimated.current = true;
      
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      
      // Text entrance (from bottom)
      tl.to(".hero-text-inner", {
        y: "0%",
        duration: 0.8,
        delay: 0.2
      });
      
      // Headings entrance (staggered)
      tl.to(".hero-heading-inner", {
        y: "0%",
        duration: 0.8,
        stagger: 0.15
      }, "-=0.6");
      
      // Button entrance
      tl.to(".hero-button-inner", {
        y: "0%",
        opacity: 1,
        duration: 0.8
      }, "-=0.4");
      
      // Left icons entrance (staggered)
      tl.to(".left-icon", {
        scale: 1,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.5");
      
      // Right icon entrance
      tl.to(".right-icon", {
        scale: 1,
        opacity: 1,
        duration: 0.6
      }, "-=0.3");
    }
  }, [animationsReady]);

  return (
    <section ref={heroRef} id="hero" className="section-hero relative w-full flex flex-col items-start bg-[black] h-[100vh] ">
       <div className='left-side-line w-[1px] h-[100%] bg-[#FFFFFF33] absolute left-[31px] md:left-[31px] z-[100] top-[0px]'></div>
       

          <div className="text-[white] text-[48px] line-height-[100px] font-light tracking-normal z-[20] ">
            <div className="first-text overflow-hidden block h-fit py-1">
              <span className="first-text-span hero-text-inner block pb-1 translate-y-full">{t.hero.line1}</span>
            </div>
          </div>
          <h1 className="text-[white] z-[20] w-[80%]">
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1 translate-y-full">{t.hero.line2}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1 translate-y-full">{t.hero.line3}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1 translate-y-full">
                  {t.hero.line4_prefix}
                  <span className="font-[700]">{t.hero.line4_brand}</span>
                  {t.hero.line4_suffix}
                </span>
              </div>
            </div>
          </h1>
          <div className="hero-button-wrapper hero-button mt-[44px] z-[20] overflow-hidden ">
            <div className="hero-button-inner translate-y-full opacity-0">
              <Button 
                css={'gradient-border w-[261px] h-[49px] bg-[#000000] !transition-all !duration-300 !ease-in-out'} 
                text={t.hero.cta} 
                onClick={() => {console.log('clicked')}} 
                galaxyMode={true} 
              />
            </div>
          </div>
          <div className='icons flex justify-between w-[88%]  z-[20]  absolute bottom-[131px]'>
            <div className='left-side-icons  w-[40%] flex justify-start gap-[24px]'>
                <SocialIcon icon="/icons/tweet.svg" className="left-icon opacity-0 scale-0" />
                <SocialIcon icon="/icons/insta.svg" className="left-icon opacity-0 scale-0" />
                <SocialIcon icon="/icons/face.svg" className="left-icon opacity-0 scale-0" />
                <SocialIcon icon="/icons/gmail.svg" className="left-icon opacity-0 scale-0" />
            </div>
            <div className='right-side-icons w-[40%] flex justify-end'>
              <SocialIcon icon="/icons/pause.svg" size={15} className="right-icon opacity-0 scale-0" />
            </div>
          </div>
      <div className='right-side-line w-[1px] h-[100%] bg-[#FFFFFF33] absolute right-[31px] md:right-[31px] z-[100] top-[0px]'></div>

      <GalaxyAnimation />

    </section>
  );
};
