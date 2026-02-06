'use client';

import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../app/globals.css';
import { useLanguage } from '@/context/LanguageContext';
import HamburgerMenu from '../ui/HamburgerMenu';

gsap.registerPlugin(ScrollTrigger);

type NavTheme = 'transparent' | 'black' | 'white';

export const Navbar = () => {
  const { t, language, setLanguage } = useLanguage();
  const [navTheme, setNavTheme] = useState<NavTheme>('transparent');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [activeLink, setActiveLink] = useState('');
  const navRef = useRef<HTMLElement>(null);
  const isFirstBurgerRun = useRef(true);
  const mobileMenuOverlayRef = useRef<HTMLDivElement>(null);
  const mobileMenuPanelRef = useRef<HTMLDivElement>(null);
  const mobileMenuInitialized = useRef(false);

  // Mobile Viewport Detection
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

  // Theme Logic: Scroll & Intersection
  useEffect(() => {
    const handleScrollAndIntersection = () => {
      // 1. Check Scroll Position
      const isAtTop = window.scrollY <= 50;
      
      // 2. Check Service Section Intersection
      // We use a manual check here for simplicity inside the scroll handler, 
      // or we could use IntersectionObserver. 
      // Given the requirement "when reaching service section", let's use getBoundingClientRect for precise "navbar over section" detection.
      
      const serviceSection = document.getElementById('services');
      let isOverService = false;

      if (serviceSection) {
        const rect = serviceSection.getBoundingClientRect();
        // Navbar height is approx 125px. We switch when the service section reaches the navbar area.
        // We consider "over service" if the top of service is near the top of viewport (e.g. <= 125/2) 
        // AND the bottom of service is still in viewport.
        const navHeight = 125;
        const offset = navHeight / 2; 
        
        // Switch to white when Service top is near navbar
        if (rect.top <= offset && rect.bottom >= offset) {
          isOverService = true;
        }
      }

      // Determine Theme
      if (isMobileViewport) {
        // Mobile: Always colored (no transparent), switch between black/white
        setNavTheme(isOverService ? 'white' : 'black');
      } else {
        // Desktop
        if (isAtTop) {
          setNavTheme('transparent');
        } else {
          // Scrolled
          setNavTheme(isOverService ? 'white' : 'black');
        }
      }
    };

    // Attach listeners
    window.addEventListener('scroll', handleScrollAndIntersection);
    window.addEventListener('resize', handleScrollAndIntersection);
    
    // Initial check
    handleScrollAndIntersection();

    return () => {
      window.removeEventListener('scroll', handleScrollAndIntersection);
      window.removeEventListener('resize', handleScrollAndIntersection);
    };
  }, [isMobileViewport]);


  // Determine text color based on theme
  // 'transparent' -> White text
  // 'black' -> White text
  // 'white' -> Black text
  const isLightText = navTheme === 'transparent' || navTheme === 'black';
  const logoFill = isLightText ? '#FFFFFF' : '#000000';
  const textColorClass = isLightText ? 'text-[#FFFFFF]' : 'text-[#000000]';
  const hoverColorClass = isLightText ? 'hover:text-[#FFFFFF]' : 'hover:text-[#000000]/70'; // Keep hover subtle for black, full white for white
  const borderColorClass = isLightText ? 'bg-[#FFFFFF33]' : 'bg-[#000000]/10'; // For lines
  
  // Navbar background class
  let navBgClass = '';
  if (navTheme === 'black') navBgClass = 'navbar-black';
  else if (navTheme === 'white') navBgClass = 'navbar-white';
  // transparent has no extra class (default styles handle it)

  // Mobile Menu Logic
  useLayoutEffect(() => {
    const panel = mobileMenuPanelRef.current;
    const overlay = mobileMenuOverlayRef.current;
    if (!panel || !overlay) return;
    
    // Initial set: full-width panel, fade-in only (no width animation)
    gsap.set(panel, { 
      opacity: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      boxShadow: '0 18px 45px rgba(0, 0, 0, 0.1)'
    });
    gsap.set(overlay, { opacity: 0, pointerEvents: 'none' });
    const linkInners = panel.querySelectorAll('.mobile-menu-link-inner');
    gsap.set(linkInners, { y: '100%' });
    mobileMenuInitialized.current = true;
  }, []);

  // Update Mobile Menu Background based on current theme to match navbar
  useEffect(() => {
    const panel = mobileMenuPanelRef.current;
    if (!panel) return;
    
    // If navbar is white, menu should be white (with black text).
    // If navbar is black (or transparent -> black on mobile), menu should be black (with white text).
    
    const menuBg = navTheme === 'white' ? 'rgba(255, 255, 255, 0.9)' : 'rgba(0, 0, 0, 0.9)';
    const menuBlur = 'blur(14px)';
    
    gsap.to(panel, {
      backgroundColor: menuBg,
      backdropFilter: menuBlur,
      WebkitBackdropFilter: menuBlur,
      duration: 0.3
    });
    
  }, [navTheme]);

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
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3,
        ease: 'power2.out',
      });
      const linkInners = panel.querySelectorAll('.mobile-menu-link-inner');
      gsap.set(linkInners, { y: '100%' });
      gsap.to(linkInners, {
        y: 0,
        duration: 0.45,
        stagger: 0.07,
        delay: 0.35,
        ease: 'power2.out',
      });
    } else {
      gsap.to(overlay, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.out',
      });
      gsap.to(panel, {
        opacity: 0,
        pointerEvents: 'none',
        duration: 0.25,
        ease: 'power2.out',
        onComplete: () => {
          const linkInners = mobileMenuPanelRef.current?.querySelectorAll('.mobile-menu-link-inner');
          if (linkInners?.length) gsap.set(linkInners, { y: '100%' });
        },
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

  // Prevent scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      window.dispatchEvent(new CustomEvent('lenis:stop'));
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
      window.dispatchEvent(new CustomEvent('lenis:start'));
    };
  }, [isMobileMenuOpen]);

  const handleToggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLinkClick = (linkName: string) => {
    setActiveLink(linkName);
    handleCloseMobileMenu();
  };

  return (
    <div className="fixed for-navbar-fixed w-[100%] top-0 left-0 right-0 z-50 flex  justify-center overflow-x-hidden">
      <nav
        ref={navRef}
        data-theme={navTheme}
        className={`relative flex h-[125px] w-full max-w-[1920px] items-center justify-between px-4 md:px-8 max-[1024px]:px-5 ${navBgClass}`}
      >
        <div className="navbar-bg-overlay navbar-bg-black" aria-hidden />
        <div className="navbar-bg-overlay navbar-bg-white" aria-hidden />
        <div className="for-logo relative w-[15%] flex justify-center h-full shrink-0 items-center">
          <div
            className={`logo-left-line absolute left-[0] top-0 z-[100] h-[124px] w-[1px] transition-colors duration-[0.4s] ${borderColorClass}`}
            aria-hidden
          />
          <div className={`logo flex shrink-0 items-center text-xl font-bold transition-colors duration-[0.4s] ${textColorClass}`}>
            <svg
              width="70px"
              height="100px"
              viewBox="0 0 52 97"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="h-full w-auto"
            >
              <path
                className="logo-f transition-colors duration-[0.4s]"
                d="M34.632 54.472H15.048V76H5.832V23.368H38.376V31.864H15.048V46.192H34.632V54.472Z"
                fill={logoFill}
              />
              <circle
                className="logo-ball"
                cx="37.5"
                cy="76.5"
                r="10"
                fill="#E85B5B"
                fillOpacity="1"
              />
            </svg>
          </div>
          <div
            className={`logo-right-line absolute right-[0] top-0 z-[100] h-[124px] w-[1px] transition-colors duration-[0.4s] ${borderColorClass}`}
            aria-hidden
          />
        </div>

        {/* Desktop nav links: only > 1024px */}
        <div className="nav-links hidden min-[1025px]:flex h-full items-center gap-6">
          <a
            href="#about"
            className={`text-12 transition-colors duration-[0.4s] ${textColorClass} ${hoverColorClass} ${activeLink === 'weAre' ? 'active' : ''}`}
            onClick={() => handleLinkClick('weAre')}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">{t.navbar.weAre}</span>
            </div>
          </a>
          <a
            href="#services"
            className={`text-12 transition-colors duration-[0.4s] ${textColorClass} ${hoverColorClass} ${activeLink === 'services' ? 'active' : ''}`}
            onClick={() => handleLinkClick('services')}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">{t.navbar.services}</span>
            </div>
          </a>
          <a
            href="#hero"
            className={`text-12 transition-colors duration-[0.4s] ${textColorClass} ${hoverColorClass} ${activeLink === 'blog' ? 'active' : ''}`}
            onClick={() => handleLinkClick('blog')}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">{t.navbar.blog}</span>
            </div>
          </a>
          <a
            href="#footer"
            className={`text-12 transition-colors duration-[0.4s] ${textColorClass} ${hoverColorClass} ${activeLink === 'contact' ? 'active' : ''}`}
            onClick={() => handleLinkClick('contact')}
          >
            <div className="inline-block h-fit overflow-hidden py-1">
              <span className="nav-item-inner block pb-1">{t.navbar.contact}</span>
            </div>
          </a>
        </div>

        {/* Languages + Hamburger row */}
        <div className="relative w-[15%] mobile-right-side flex justify-center gap-[20px] shrink-0 items-center gap-6">
          <div className=" flex h-full shrink-0 items-center">
            <div
              className={`languages-left-line absolute left-[0px] top-0 z-[100] h-[124px] w-[1px] transition-colors duration-[0.4s] ${borderColorClass}`}
              aria-hidden
            />
            <div className="language-links h-full flex items-center">
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setLanguage('ka'); }}
                className={`text-12 transition-colors duration-[0.4s] ${
                  language === 'ka' 
                    ? (isLightText ? '!text-[#FFFFFF8F] font-bold' : '!text-[#0000008F] font-bold')
                    : (isLightText ? '!text-[#FFFFFF]' : '!text-[#000000]/60')
                }`}
              >
                <div className="inline-block h-fit overflow-hidden py-1">
                  <span className="nav-item-inner block pb-1">{t.navbar.ka}</span>
                </div>
              </a>
              <a
                href="#"
                onClick={(e) => { e.preventDefault(); setLanguage('en'); }}
                className={`text-12 transition-colors duration-[0.4s] ${
                  language === 'en'
                    ? (isLightText ? '!text-[#FFFFFF8F] font-bold' : '!text-[#0000008F] font-bold')
                    : (isLightText ? '!text-[#FFFFFF]' : '!text-[#000000]/60')
                }`}
              >
                <div className="inline-block h-fit overflow-hidden py-1">
                  <span className="nav-item-inner block pb-1">{t.navbar.en}</span>
                </div>
              </a>
            </div>
            <div
              className={`languages-right-line absolute right-[0px] top-0 z-[100] h-[124px] w-[1px] transition-colors duration-[0.4s] ${borderColorClass}`}
              aria-hidden
            />
          </div>

          {/* Hamburger: ≤ 1024px */}
          {/* <button
            type="button"
            className="flex min-[1025px]:hidden h-[25px] w-[25px] rounded-[3px] shrink-0 items-center justify-center border-0 bg-[#F43E46] outline-none transition-colors duration-200 focus:outline-none"
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
          </button> */}
          
          <div className="hidden max-[1025px]:block">
            <HamburgerMenu
              isOpen={isMobileMenuOpen}
              onToggle={handleToggleMobileMenu}
            />
          </div>
        </div>
      </nav>

     
      <div className={`navbar-bottom-line w-[100%] h-[1px] absolute bottom-[0px] left-0 transition-colors duration-[0.4s] ${borderColorClass}`}></div>

      {/* Mobile menu: overlay + side panel, always in DOM on mobile for exit animation */}
      <div
        className={`fixed inset-0 z-40 min-[1025px]:hidden ${isMobileMenuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        aria-hidden={!isMobileMenuOpen}
        id="mobile-menu"
        style={{ overscrollBehavior: 'none' }}
      >
        <div
          ref={mobileMenuOverlayRef}
          className="fixed inset-0 bg-black/90 backdrop-blur-md"
          style={{ opacity: 0, pointerEvents: 'none', touchAction: 'none' }}
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
          className="fixed inset-x-0 bottom-0 top-[125px] z-50 flex w-full flex-col overflow-hidden bg-[white] px-6 pb-8 pt-[30px] left-[0] h-[100vh] shadow-2xl"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <nav className="mobile-navigation h-[80%] w-full  " onClick={(e) => e.stopPropagation()}>
            <div className='flex flex-col justify-center items-[center] gap-[50px] mt-[30px] '>
              
           
            <a
              href="#about"
              className={`mobile-menu-link text-[14px] transition-colors duration-[0.4s] flex justify-center ${isLightText ? 'text-[#FFFFFF] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#000000]/70'}`}
              onClick={() => handleLinkClick('weAre')}
            >
              <div className="overflow-hidden block h-fit py-1">
                <span className="mobile-menu-link-inner block pb-1 text-[18px]">{t.navbar.weAre}</span>
              </div>
            </a>
            <a
              href="#services"
              className={`mobile-menu-link text-[14px] transition-colors duration-[0.4s] flex justify-center ${isLightText ? 'text-[#FFFFFF] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#000000]/70'}`}
              onClick={() => handleLinkClick('services')}
            >
              <div className="overflow-hidden block h-fit py-1">
                <span className="mobile-menu-link-inner block pb-1 text-[18px]">{t.navbar.services}</span>
              </div>
            </a>
            <a
              href="#hero"
              className={`mobile-menu-link text-[14px] transition-colors duration-[0.4s] flex justify-center ${isLightText ? 'text-[#FFFFFF] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#000000]/70'}`}
              onClick={() => handleLinkClick('blog')}
            >
              <div className="overflow-hidden block h-fit py-1">
                <span className="mobile-menu-link-inner block pb-1 text-[18px]">{t.navbar.blog}</span>
              </div>
            </a>
            <a
              href="#footer"
              className={`mobile-menu-link text-[14px] transition-colors duration-[0.4s] flex justify-center ${isLightText ? 'text-[#FFFFFF] hover:text-[#FFFFFF]' : 'text-[#000000] hover:text-[#000000]/70'}`}
              onClick={() => handleLinkClick('contact')}
            >
              <div className="overflow-hidden block h-fit py-1">
                <span className="mobile-menu-link-inner block pb-1 text-[18px]">{t.navbar.contact}</span>
              </div>
            </a>
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};
