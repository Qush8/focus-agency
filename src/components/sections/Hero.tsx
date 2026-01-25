"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Button } from '../ui/Button';

const SocialIcon = ({ icon, size = 20 }: { icon: string; size?: number }) => (
  <div className="social-icon-wrapper w-[44px] h-[44px] border border-[#464646] rounded-lg flex items-center justify-center hover:border-[#F43E46] transition-all duration-300 group cursor-pointer bg-black">
    <img 
      src={icon} 
      alt="" 
      style={{ width: `${size}px`, height: `${size}px` }}
      className="transition-all duration-300 brightness-0 invert" 
    />
  </div>
);

export const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const iconsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || !headingRef.current || !buttonRef.current || !iconsRef.current) return;

    const ctx = gsap.context(() => {
      const headingChildren = Array.from(headingRef.current?.children || []);
      const iconContainers = Array.from(iconsRef.current?.children || []);

      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(titleRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8
      })
      .from(headingChildren, {
        opacity: 0,
        y: 40,
        duration: 0.8,
        stagger: 0.15
      }, "-=0.4")
      .from(buttonRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6
      }, "-=0.3")
      .from(iconContainers, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.1
      }, "-=0.2");
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} className="section-hero w-full flex flex-col items-start bg-[black] h-[100vh] ">
      <p ref={titleRef} className="text-[white] text-[48px] line-height-[100px] font-light tracking-normal">
        Increase your sales
      </p>
      <h1 ref={headingRef} className="text-[white]">
        <div>Increase your sales and</div>
        <div>brand awareness with</div>
        <div>the <span className="font-[700]">FocusAgency</span> team</div>
      </h1>
      <div ref={buttonRef} className="hero-button mt-[44px]">
        <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] '} text={'SCHEDULE A MEETING'} onClick={() => {console.log('clicked')}} />
      </div>
      <div ref={iconsRef} className='icons flex justify-between w-[100%] mt-[198px] '>
        <div className='left-side-icons w-[40%] flex justify-start gap-[24px]'>
            <SocialIcon icon="/icons/tweet.svg" />
            <SocialIcon icon="/icons/insta.svg" />
            <SocialIcon icon="/icons/face.svg" />
            <SocialIcon icon="/icons/gmail.svg" />
        </div>
        <div className='right-side-icons w-[40%] flex justify-end'>
          <SocialIcon icon="/icons/pause.svg" size={15} />
        </div>
      </div>
    </section>
  );
};
