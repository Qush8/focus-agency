'use client';

import { useLayoutEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface SmoothScrollProps {
  children: React.ReactNode;
}

export const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useLayoutEffect(() => {
    // Disable browser scroll restoration
    if (typeof window !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Multiple scroll reset methods for reliability
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    window.scrollTo(0, 0);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      infinite: false,
    });

    // ScrollTrigger uses Lenis scroll position so scrub animations follow scroll and stop when scroll stops
    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop: (value) => {
        if (value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect: () => ({
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.lagSmoothing(0);
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);

    // Ensure Lenis scroll happens after instance is ready
    requestAnimationFrame(() => {
      lenis.scrollTo(0, { immediate: true });
    });

    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        const href = anchor.getAttribute('href');
        if (href && href !== '#') {
          e.preventDefault();
          const targetId = href.substring(1);
          const targetElement = document.getElementById(targetId);
          
          if (targetElement) {
            lenis.scrollTo(targetElement, {
              offset: 0,
              duration: 1.2,
            });
          }
        }
      }
    };

    const handleLenisStop = () => {
      lenis.stop();
    };

    const handleLenisStart = () => {
      lenis.start();
    };

    document.addEventListener('click', handleAnchorClick);
    window.addEventListener('lenis:stop', handleLenisStop);
    window.addEventListener('lenis:start', handleLenisStart);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.off('scroll', ScrollTrigger.update);
      ScrollTrigger.scrollerProxy(document.body, {});
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('lenis:stop', handleLenisStop);
      window.removeEventListener('lenis:start', handleLenisStart);
    };
  }, []);

  return <>{children}</>;
};
