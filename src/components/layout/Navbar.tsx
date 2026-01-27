'use client'
import React, { useState, useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import "../../app/globals.css";

export const Navbar = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const navRef = useRef<HTMLElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      defaults: { duration: 0.4, ease: "power2.inOut" },
      delay: 0.1,
      onComplete: () => {
        window.dispatchEvent(new Event('navbarReady'));
      }
    });

    // Step 1: Logo 'F' animation
    tl.fromTo('.logo-f', 
      { opacity: 0 },
      { opacity: 1 }
    );

    // Step 1: Logo ball animation with overlap
    tl.fromTo('.logo-ball',
      { scale: 0 },
      { scale: 1 },
      "-=0.1"
    );

    // Step 2: All menu links animate simultaneously (no stagger)
    tl.fromTo('.nav-links .nav-item-inner',
      { y: "100%" },
      { y: 0 },
      "+=0.1"
    );

    // Step 3: All language links animate simultaneously (no stagger)
    tl.fromTo('.language-links .nav-item-inner',
      { y: "100%" },
      { y: 0 },
      "+=0.1"
    );

    // Clear y transform after animation completes to prevent layout conflicts
    tl.call(() => {
      gsap.set('.nav-item-inner', { clearProps: "y" });
      gsap.set('.logo-f', { clearProps: "opacity" });
      gsap.set('.logo-ball', { clearProps: "scale" });
    });

  }, { scope: navRef });

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav ref={navRef} className=" h-[125px] w-full max-w-[1920px] flex justify-between items-center">
        <div className="logo h-full text-xl font-bold text-[white] flex items-center">
          <svg 
            width="52" 
            height="97" 
            viewBox="0 0 52 97" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="h-full w-auto"
          >
            <path 
              className="logo-f"
              d="M34.632 54.472H15.048V76H5.832V23.368H38.376V31.864H15.048V46.192H34.632V54.472Z" 
              fill="white"
            />
            <circle 
              className="logo-ball"
              cx="41.5" 
              cy="76.5" 
              r="10.5" 
              fill="#E85B5B"
            />
          </svg>
        </div>
        <div className="nav-links flex h-full items-center">
          <a href="#about" className="hover:text-white transition-colors text-[white] text-12">
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">We are</span>
            </div>
          </a>
          <a href="#services" className="hover:text-white transition-colors text-[white] text-12">
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">Services</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">Blog</span>
            </div>
          </a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">Contact</span>
            </div>
          </a>
        </div>
        <div className="language-links h-full flex items-center">
          <a 
            href="#" 
            onClick={() => setActiveLanguage('ka')} 
            className={` ${activeLanguage === 'ka' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}
          >
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">ქარ</span>
            </div>
          </a>
          <a 
            href="#" 
            onClick={() => setActiveLanguage('en')} 
            className={` ${activeLanguage === 'en' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}
          >
            <div className="overflow-hidden inline-block h-fit py-1">
              <span className="nav-item-inner block pb-1">ENG</span>
            </div>
          </a>
        </div>
      </nav>
    </div>
  );
};
