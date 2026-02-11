'use client';

import { useState, useEffect, useRef } from 'react';

interface UseScrollSpyOptions extends IntersectionObserverInit {
  threshold?: number | number[];
  rootMargin?: string;
}

/**
 * Hook for detecting which section is currently visible in the viewport
 * @param sectionIds Array of section element IDs to observe
 * @param options Intersection Observer options
 * @returns The ID of the currently active section
 */
export const useScrollSpy = (
  sectionIds: string[],
  options?: UseScrollSpyOptions
): string => {
  const [activeSection, setActiveSection] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Store intersection ratios for all sections
    const sectionRatios = new Map<string, number>();

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        // Update the intersection ratio for this section
        sectionRatios.set(entry.target.id, entry.intersectionRatio);
      });

      // Find the section with the highest intersection ratio
      let maxRatio = 0;
      let maxSection = '';

      sectionRatios.forEach((ratio, sectionId) => {
        if (ratio > maxRatio) {
          maxRatio = ratio;
          maxSection = sectionId;
        }
      });

      // Only update if we have a section with meaningful visibility
      if (maxRatio > 0.3 && maxSection) {
        setActiveSection(maxSection);
      }
    };

    // Create observer with custom options
    observerRef.current = new IntersectionObserver(handleIntersection, {
      threshold: [0, 0.1, 0.3, 0.5, 0.7, 1],
      rootMargin: '-100px 0px -100px 0px',
      ...options,
    });

    // Observe all sections
    const elements: Element[] = [];
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element && observerRef.current) {
        observerRef.current.observe(element);
        elements.push(element);
        // Initialize ratio map
        sectionRatios.set(id, 0);
      }
    });

    // Set initial active section based on scroll position
    const initialCheck = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (element) {
          const rect = element.getBoundingClientRect();
          const elementTop = rect.top + window.scrollY;
          const elementBottom = elementTop + rect.height;
          
          if (scrollPosition >= elementTop && scrollPosition <= elementBottom) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    // Run initial check after a short delay to ensure DOM is ready
    const timeoutId = setTimeout(initialCheck, 100);

    // Cleanup
    return () => {
      clearTimeout(timeoutId);
      if (observerRef.current) {
        elements.forEach((element) => {
          observerRef.current?.unobserve(element);
        });
        observerRef.current.disconnect();
      }
    };
  }, [sectionIds, options]);

  return activeSection;
};
