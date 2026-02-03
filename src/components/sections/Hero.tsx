"use client";
import React, { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '../ui/Button';
import { useLanguage } from '@/context/LanguageContext';

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
  const { t } = useLanguage();

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
    <section ref={heroRef} className="section-hero relative w-full flex flex-col items-start bg-[black] h-[100vh] ">
       <div className='left-side-line w-[1px] h-[100%] bg-[#FFFFFF33] absolute left-[31px] z-[100] top-[0px]'></div>

          <div className="text-[white] text-[48px] line-height-[100px] font-light tracking-normal">
            <div className="overflow-hidden block h-fit py-1">
              <span className="hero-text-inner block pb-1">{t.hero.line1}</span>
            </div>
          </div>
          <h1 className="text-[white]">
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1">{t.hero.line2}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1">{t.hero.line3}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden block h-fit py-1">
                <span className="hero-heading-inner block pb-1">
                  {t.hero.line4_prefix}
                  <span className="font-[700]">{t.hero.line4_brand}</span>
                  {t.hero.line4_suffix}
                </span>
              </div>
            </div>
          </h1>
          <div className="hero-button-wrapper hero-button mt-[44px]">
            <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] '} text={t.hero.cta} onClick={() => {console.log('clicked')}} />
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
      <div className='right-side-line w-[1px] h-[100%] bg-[#FFFFFF33] absolute right-[31px] z-[100] top-[0px]'></div>

    </section>
  );
};
