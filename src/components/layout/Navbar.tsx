'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../app/globals.css';

gsap.registerPlugin(ScrollTrigger);

export const Navbar = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  const [isServiceSection, setIsServiceSection] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const isFirstBurgerRun = useRef(true);
  const mobileMenuOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuInitialized = useRef(false);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: 'power2.out' },
        delay: 0.1,
      });

      tl.fromTo('.logo-f', { opacity: 0 }, { opacity: 1 });

      tl.fromTo(
        '.logo-ball',
        { scale: 0 },
        { scale: 1 },
        '0.1',
      );

      tl.fromTo(
        '.nav-links .nav-item-inner',
        { y: '100%' },
        { y: 0 },
        '0.2',
      );

      tl.fromTo(
        '.language-links .nav-item-inner',
        { y: '100%' },
        { y: 0 },
        '0.3',
      );

      tl.call(() => {
        gsap.set('.nav-item-inner', { clearProps: 'y' });
        gsap.set('.logo-f', { clearProps: 'opacity' });
        gsap.set('.logo-ball', { clearProps: 'scale' });
      });
    },
    { scope: navRef },
  );

  useEffect(() => {
    const mediaQueryList = window.matchMedia('(max-width: 1024px)');

    const handleMediaChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsMobileViewport(event.matches);
    };

    handleMediaChange(mediaQueryList);

    if (typeof mediaQueryList.addEventListener === 'function') {
      mediaQueryList.addEventListener('change', handleMediaChange);
      return () => {
        mediaQueryList.removeEventListener('change', handleMediaChange);
      };
    }

    // Safari fallback
    mediaQueryList.addListener(handleMediaChange);
    return () => {
      mediaQueryList.removeListener(handleMediaChange);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    const shouldShowNavBg = isServiceSection || isMobileViewport;

    gsap.to(navRef.current, {
      backgroundColor: shouldShowNavBg
        ? 'rgba(0, 0, 0, 0.65)'
        : 'rgba(0, 0, 0, 0)',
      boxShadow: shouldShowNavBg
        ? '0 18px 45px rgba(0, 0, 0, 0.55)'
        : '0 0 0 rgba(0, 0, 0, 0)',
      backdropFilter: shouldShowNavBg ? 'blur(14px)' : 'blur(0px)',
      WebkitBackdropFilter: shouldShowNavBg ? 'blur(14px)' : 'blur(0px)',
      duration: 0.6,
      ease: 'power3.out',
    });
  }, [isServiceSection, isMobileViewport]);

  useEffect(() => {
    const checkHero = () => {
      const heroSection = document.querySelector('.section-hero');

      if (!heroSection) {
        setTimeout(checkHero, 100);
        return;
      }

      const heroObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            const isHeroVisible = entry.isIntersecting;
            setIsServiceSection(!isHeroVisible);
          });
        },
        {
          threshold: 0,
          rootMargin: '0px',
        },
      );

      heroObserver.observe(heroSection);

      return () => {
        heroObserver.disconnect();
      };
    };

    const cleanup = checkHero();
    return () => {
      if (typeof cleanup === 'function') {
        cleanup();
      }
    };
  }, []);

  useLayoutEffect(() => {
    const panel = mobileMenuPanelRef.current;
    const overlay = mobileMenuOverlayRef.current;
    if (!panel || !overlay) return;
    gsap.set(panel, { 
      width: 0, 
      overflow: 'hidden',
      backgroundColor: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(14px)',
      WebkitBackdropFilter: 'blur(14px)',
      boxShadow: '0 18px 45px rgba(0, 0, 0, 0.55)'
    });
    gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
    mobileMenuInitialized.current = true;
  }, []);

  useEffect(() => {
    const panel = mobileMenuPanelRef.current;
    const overlay = mobileMenuOverlayRef.current;
    if (!panel || !overlay || !mobileMenuInitialized.current) return;

    if (isMobileMenuOpen) {
      gsap.to(overlay, {
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });
      gsap.to(panel, {
        width: '100%',
        duration: 0.35,
        ease: 'power2.out',
      });
      const links = panel.querySelectorAll('.mobile-menu-link');
      gsap.fromTo(
        links,
        { clipPath: 'inset(0 0 100% 0)' },
        {
          clipPath: 'inset(0 0 0% 0)',
          duration: 0.4,
          stagger: 0.08,
          delay: 0.15,
          ease: 'power2.out',
        },
      );
    } else {
      gsap.to(overlay, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(panel, {
        width: 0,
        duration: 0.35,
        ease: 'power2.out',
      });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const bars = document.querySelector('.burger-bars-svg');
    const x = document.querySelector('.burger-x-svg');
    if (!bars || !x) return;

    if (isFirstBurgerRun.current) {
      gsap.set(bars, { opacity: 1, scale: 1, transformOrigin: 'center' });
      gsap.set(x, { opacity: 0, scale: 0.85, transformOrigin: 'center' });
      isFirstBurgerRun.current = false;
      return;
    }

    gsap.to(bars, {
      opacity: isMobileMenuOpen ? 0 : 1,
      scale: isMobileMenuOpen ? 0.85 : 1,
      duration: 0.5,
      ease: 'power2.out',
      transformOrigin: 'center',
    });
    gsap.to(x, {
      opacity: isMobileMenuOpen ? 1 : 0,
      scale: isMobileMenuOpen ? 1 : 0.85,
      duration: 0.5,
      ease: 'power2.out',
      transformOrigin: 'center',
    });
  }, [isMobileMenuOpen]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex w-full justify-center overflow-x-hidden">
      <nav
        ref={navRef}
        className="flex h-[125px] w-full max-w-[1920px] items-center justify-between px-4 md:px-8 max-[1024px]:px-5"
      >
        <div className="relative w-[15%] flex justify-center h-full shrink-0 items-center">
          <div
            className="logo-left-line absolute left-[0] top-0 z-[100] h-[124px] w-[1px] "
            aria-hidden
          />
          <div className="logo flex shrink-0 items-center text-xl font-bold text-[white]">
            <svg
              width="70px"
              height="100px"
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
                cx="37.5"
                cy="76.5"
                r="10"
                fill="#E85B5B"
              />
            </svg>
          </div>
          <div
            className="logo-right-line absolute right-[0] top-0 z-[100] h-[124px] w-[1px] bg-[#FFFFFF33]"
            aria-hidden
          />
        </div>

        {/* Desktop nav links: only > 1024px */}
        <div className="nav-links hidden min-[1025px]:flex h-full items-center gap-6">
          <a
            href="#about"
            className="text-12 hover:text-white transition-colors text-[white]"
            onClick={handleCloseMobileMenu}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">We are</span>
            </div>
          </a>
          <a
            href="#services"
            className="text-12 hover:text-white transition-colors text-[white]"
            onClick={handleCloseMobileMenu}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">Services</span>
            </div>
          </a>
          <a
            href="#blog"
            className="text-12 hover:text-white transition-colors text-[white]"
            onClick={handleCloseMobileMenu}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">Blog</span>
            </div>
          </a>
          <a
            href="#contact"
            className="text-12 hover:text-white transition-colors text-[white]"
            onClick={handleCloseMobileMenu}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">Contact</span>
            </div>
          </a>
        </div>

        {/* Languages + Hamburger row */}
        <div className="relative w-[15%] flex justify-center gap-[20px] shrink-0 items-center gap-6">
          <div className=" flex h-full shrink-0 items-center">
            <div
              className="languages-left-line absolute left-[0px] top-0 z-[100] h-[124px] w-[1px] bg-[#FFFFFF33]"
              aria-hidden
            />
            <div className="language-links h-full flex items-center">
              <a
                href="#"
                onClick={() => setActiveLanguage('ka')}
                className={` ${activeLanguage === 'ka' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}
              >
                <div className="inline-block h-fit overflow-hidden py-1">
                  <span className="nav-item-inner block pb-1">ქარ</span>
                </div>
              </a>
              <a
                href="#"
                onClick={() => setActiveLanguage('en')}
                className={` ${activeLanguage === 'en' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}
              >
                <div className="inline-block h-fit overflow-hidden py-1">
                  <span className="nav-item-inner block pb-1">ENG</span>
                </div>
              </a>
            </div>
            <div
              className="languages-right-line absolute right-[0px] top-0 z-[100] h-[124px] w-[1px] bg-[]"
              aria-hidden
            />
          </div>

          {/* Hamburger: ≤ 1024px */}
          <button
            type="button"
            className="flex min-[1025px]:hidden h-[25px] w-[25px] rounded-[3px] shrink-0 items-center justify-center  border-0 bg-[#F43E46] outline-none transition-colors duration-200 focus:outline-none"
            aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            onClick={handleToggleMobileMenu}
          >
            <span className="relative block h-[22px] w-[22px]">
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="burger-bars-svg absolute inset-0 m-auto block"
                style={{ pointerEvents: isMobileMenuOpen ? 'none' : 'auto' }}
              >
                <line x1="4" y1="7" x2="20" y2="7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="12" x2="20" y2="12" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="4" y1="17" x2="20" y2="17" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="burger-x-svg absolute inset-0 m-auto block"
                style={{ pointerEvents: isMobileMenuOpen ? 'auto' : 'none' }}
              >
                <line x1="5" y1="5" x2="19" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="5" x2="5" y2="19" stroke="white" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </span>
          </button>
        </div>
      </nav>

     
      <div className='navbar-bottom-line w-[100%] h-[1px] bg-[#FFFFFF33] absolute bottom-[0px] left-0'></div>

      {/* Mobile menu: overlay + side panel, always in DOM on mobile for exit animation */}
      <div
        className={`fixed inset-0 z-40 min-[1025px]:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
        id="mobile-menu"
      >
        <div
          ref={mobileMenuOverlayRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          style={{ opacity: 0, pointerEvents: 'none' }}
          onClick={handleCloseMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Escape') handleCloseMobileMenu();
          }}
          role="button"
          tabIndex={isMobileMenuOpen ? 0 : -1}
          aria-label="Close menu"
        />
        <div
          ref={mobileMenuPanelRef}
          id="mobile-menu-panel"
          className="fixed left-[0] bottom-0 z-50 flex flex-col overflow-hidden shadow-2xl  px-6 pb-8 top-[125px] flex gap-[20px] pt-[30px] pb-[30px] "
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="" onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col  gap-[20px] '>
              
           
            <a
              href="#about"
              className="mobile-menu-link text-[14px] text-[white] transition-colors hover:text-white"
              onClick={handleCloseMobileMenu}
            >
              <div className="inline-block h-fit overflow-hidden py-1">
                <span className="nav-item-inner block pb-1">We are</span>
              </div>
            </a>
            <a
              href="#services"
              className="mobile-menu-link text-[14px] text-[white] transition-colors hover:text-white"
              onClick={handleCloseMobileMenu}
            >
              <div className="inline-block h-fit overflow-hidden py-1">
                <span className="nav-item-inner block pb-1">Services</span>
              </div>
            </a>
            <a
              href="#blog"
              className="mobile-menu-link text-[14px] text-[white] transition-colors hover:text-white"
              onClick={handleCloseMobileMenu}
            >
              <div className="inline-block h-fit overflow-hidden py-1">
                <span className="nav-item-inner block pb-1">Blog</span>
              </div>
            </a>
            <a
              href="#contact"
              className="mobile-menu-link text-[14px] text-[white] transition-colors hover:text-white"
              onClick={handleCloseMobileMenu}
            >
              <div className="inline-block h-fit overflow-hidden py-1">
                <span className="nav-item-inner block pb-1">Contact</span>
              </div>
            </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

