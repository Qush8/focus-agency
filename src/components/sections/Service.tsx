"use client";
import React, { useState, useRef } from 'react';
import '../../app/globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItemProps {
    title: string;
    subtitle: string;
    description: string;
    side: 'left' | 'right';
    index: number;
    isOpen: boolean;
    onToggle: () => void;
}

const LINE_CLOSED_BOTTOM = -60;
const LINE_OPEN_BOTTOM = -160;
const LINE_ANIM_DURATION = 0.4;
const TEXT_DELAY_AFTER_LINE = 0;

const ServiceItem: React.FC<ServiceItemProps> = ({ title, subtitle, description, side, index, isOpen, onToggle }) => {
    const [showDescription, setShowDescription] = useState(false);

    React.useEffect(() => {
        if (isOpen) {
            const t = setTimeout(() => setShowDescription(true), (LINE_ANIM_DURATION + TEXT_DELAY_AFTER_LINE) * 0.01);
            return () => clearTimeout(t);
        }
        setShowDescription(false);
    }, [isOpen]);

    return (
        <div className="relative">
            <h3 className={`text-[76px] text-[#000000D1] service-title-${side}-${index}`}>
                <div className={`right-side-title`}>
                    {title}
                </div>
            </h3>
            <div className={`flex subtitle gap-[10px] cursor-pointer group service-subtitle-${side}-${index}`} onClick={onToggle}>
                <p className={`text-[32px] text-[#000000AD] transition-colors duration-300 group-hover:text-[#000000] service-subtitle-text-${side}-${index}`}>
                    {subtitle}
                </p>
                <motion.img 
                    src="/icons/arrow.svg" 
                    alt="" 
                    className={`w-[18px] h-[24px] mt-[15px] service-arrow-${side}-${index}`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence>
                {isOpen && showDescription && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: 'easeInOut' }}
                        className="overflow-hidden absolute top-full left-0 w-full z-10 bg-white"
                    >
                        <div className="service-description-content pt-4 pb-2">
                            <p className="text-[24px] text-[#00000090] font-light leading-relaxed max-w-full md:max-w-[80%]">
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Service = () => {
    const serviceRef = useRef<HTMLElement>(null);
    const { t } = useLanguage();
    const [openId, setOpenId] = useState<string | null>(null);

    const leftSideServices = t.services.items.slice(0, 2);
    const rightSideServices = t.services.items.slice(2, 4);

    useGSAP(() => {
        const mm = gsap.matchMedia();

        // Desktop / large screens: current behavior (side slide + arrows scale)
        mm.add("(min-width: 1024px)", () => {
            // Set initial hidden states
            gsap.set('.service-h2-line-1, .service-h2-line-2', { y: "100%" });
            // Add opacity: 0 to sliding text elements
            gsap.set('.service-title-right-0, .service-title-right-1', { x: 100, opacity: 0 });
            gsap.set('.service-title-left-0, .service-title-left-1', { x: -100, opacity: 0 });
            gsap.set('.service-subtitle-text-right-0, .service-subtitle-text-right-1', { x: 100, opacity: 0 });
            gsap.set('.service-subtitle-text-left-0, .service-subtitle-text-left-1', { x: -100, opacity: 0 });
            gsap.set('.service-arrow-right-0, .service-arrow-right-1, .service-arrow-left-0, .service-arrow-left-1', { scale: 0, opacity: 0 });
            
            // New lines initial state (removed set, using fromTo in timeline)
            // gsap.set('.left-side-line, .right-side-line', { scaleY: 0, transformOrigin: 'top' });
            // gsap.set('.service-headline-line', { scaleX: 0, transformOrigin: 'left' });
            // Mini lines initial state
            // gsap.set('.left-side-mini-line', { scaleX: 0, transformOrigin: 'left' });
            // gsap.set('.right-side-mini-line', { scaleX: 0, transformOrigin: 'right' });
            
            // Service Item Lines initial state (scaleX + opacity + visibility for first-paint hide)
            gsap.set('.service-line-left-0, .service-line-left-1', { scaleX: 0, transformOrigin: 'left', opacity: 0, visibility: 'hidden' });
            gsap.set('.service-line-right-0, .service-line-right-1', { scaleX: 0, transformOrigin: 'right', opacity: 0, visibility: 'hidden' });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceRef.current,
                    start: "top 75%",
                    end: "bottom 99%",
                    scrub: true,
                    invalidateOnRefresh: true
                },
                defaults: { ease: "none" }
            });

            // 1. Left and Right lines descend (using clipPath)
            tl.fromTo('.left-side-line, .right-side-line', 
                { clipPath: 'inset(0 0 100% 0)' }, 
                { clipPath: 'inset(0 0 0% 0)', duration: 1 }, 
                0
            );

            // 2. Main text "We offer full digital"
            tl.to('.service-h2-line-1', { y: 0 }, 0.4);

            // 3. Line below it AND mini lines
            tl.fromTo('.service-headline-line', 
                { scaleX: 0, transformOrigin: 'left' }, 
                { scaleX: 1 }, 
                0.5
            );
            
            // Mini lines: Left grows from left, Right grows from right
            tl.fromTo('.left-side-mini-line', 
                { clipPath: 'inset(0 100% 0 0)' }, 
                { clipPath: 'inset(0 0 0 0)' }, 
                0.55
            );
            tl.fromTo('.right-side-mini-line', 
                { clipPath: 'inset(0 0 0 100%)' }, 
                { clipPath: 'inset(0 0 0 0)' }, 
                0.55
            );

            // 4. "services" text
            tl.to('.service-h2-line-2', { y: 0 }, 0.6);

            // Items sequence (shifted to start after 0.8)
            // right[0] title (right-to-left + fade in)
            tl.to('.service-title-right-0', { x: 0, opacity: 1 }, 0.9);
            // right[0] subtitle text (right-to-left + fade in)
            tl.to('.service-subtitle-text-right-0', { x: 0, opacity: 1 }, 1.0);
            // right[0] arrow (scale + opacity)
            tl.to('.service-arrow-right-0', { scale: 1, opacity: 1 }, 1.2);

            // left[0] title (left-to-right + fade in) - starts after right[0] arrow
            tl.to('.service-title-left-0', { x: 0, opacity: 1 }, 1.0);
            // left[0] subtitle text (left-to-right + fade in)
            tl.to('.service-subtitle-text-left-0', { x: 0, opacity: 1 }, 1.1);
            // left[0] arrow (scale + opacity)
            tl.to('.service-arrow-left-0', { scale: 1, opacity: 1 }, 1.2);

            // right[1] title (right-to-left + fade in)
            tl.to('.service-title-right-1', { x: 0, opacity: 1 }, 1.3);
            // right[1] subtitle text (right-to-left + fade in)
            tl.to('.service-subtitle-text-right-1', { x: 0, opacity: 1 }, 1.4);
            // right[1] arrow (scale + opacity)
            tl.to('.service-arrow-right-1', { scale: 1, opacity: 1 }, 1.5);

            // left[1] title (left-to-right + fade in)
            tl.to('.service-title-left-1', { x: 0, opacity: 1 }, 1.6);
            // left[1] subtitle text (left-to-right + fade in)
            tl.to('.service-subtitle-text-left-1', { x: 0, opacity: 1 }, 1.7);
            // left[1] arrow (scale + opacity)
            tl.to('.service-arrow-left-1', { scale: 1, opacity: 1 }, 1.8);

            // Service item lines: grow over a scroll range (fromTo + duration so they don’t “pop”)
            tl.fromTo('.service-line-right-0', { scaleX: 0, transformOrigin: 'right', opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, onStart: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'visible', 'important'); } }, 1.25);
            tl.fromTo('.service-line-left-0', { scaleX: 0, transformOrigin: 'left', opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, onStart: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'visible', 'important'); } }, 1.55);
            tl.fromTo('.service-line-right-1', { scaleX: 0, transformOrigin: 'right', opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, onStart: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'visible', 'important'); } }, 1.75);
            tl.fromTo('.service-line-left-1', { scaleX: 0, transformOrigin: 'left', opacity: 0 }, { scaleX: 1, opacity: 1, duration: 0.6, onStart: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'visible', 'important'); } }, 1.95);

            // Scroll-out timeline - scrubs with scroll position when scrolling past section
            const scrollOutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceRef.current,
                    start: "bottom top", // Starts when section bottom reaches viewport top
                    end: "+=1000", // Animation completes after scrolling 1000px past start
                    scrub: true,
                    invalidateOnRefresh: true
                },
                defaults: { ease: "none" }
            });

            // Reverse order: last appeared → first appeared (lines shrink + opacity 0)
            // left[1] (last)
            scrollOutTl.to('.service-arrow-left-1', { scale: 0, opacity: 0 }, 0);
            scrollOutTl.to('.service-subtitle-text-left-1', { x: -100, opacity: 0 }, 0.05);
            scrollOutTl.fromTo('.service-line-left-1', { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, duration: 0.08, onComplete: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'hidden', 'important'); } }, 0.02);
            scrollOutTl.to('.service-title-left-1', { x: -100, opacity: 0 }, 0.1);

            // right[1]
            scrollOutTl.to('.service-arrow-right-1', { scale: 0, opacity: 0 }, 0.2);
            scrollOutTl.to('.service-subtitle-text-right-1', { x: 100, opacity: 0 }, 0.25);
            scrollOutTl.fromTo('.service-line-right-1', { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, duration: 0.08, onComplete: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'hidden', 'important'); } }, 0.22);
            scrollOutTl.to('.service-title-right-1', { x: 100, opacity: 0 }, 0.3);

            // left[0]
            scrollOutTl.to('.service-arrow-left-0', { scale: 0, opacity: 0 }, 0.4);
            scrollOutTl.to('.service-subtitle-text-left-0', { x: -100, opacity: 0 }, 0.45);
            scrollOutTl.fromTo('.service-line-left-0', { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, duration: 0.08, onComplete: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'hidden', 'important'); } }, 0.42);
            scrollOutTl.to('.service-title-left-0', { x: -100, opacity: 0 }, 0.5);

            // right[0]
            scrollOutTl.to('.service-arrow-right-0', { scale: 0, opacity: 0 }, 0.6);
            scrollOutTl.to('.service-subtitle-text-right-0', { x: 100, opacity: 0 }, 0.65);
            scrollOutTl.fromTo('.service-line-right-0', { scaleX: 1, opacity: 1 }, { scaleX: 0, opacity: 0, duration: 0.08, onComplete: function() { (this.targets()[0] as HTMLElement).style.setProperty('visibility', 'hidden', 'important'); } }, 0.62);
            scrollOutTl.to('.service-title-right-0', { x: 100, opacity: 0 }, 0.7);

            // h2 lines & mini lines
            scrollOutTl.to('.service-h2-line-2', { y: "-100%" }, 0.8);
            scrollOutTl.to('.left-side-mini-line', { clipPath: 'inset(0 100% 0 0)' }, 0.85);
            scrollOutTl.to('.right-side-mini-line', { clipPath: 'inset(0 0 0 100%)' }, 0.85);
            scrollOutTl.to('.service-headline-line', { scaleX: 0 }, 0.85);
            scrollOutTl.to('.service-h2-line-1', { y: "-100%" }, 0.9);
            
            // Side lines
            scrollOutTl.to('.left-side-line, .right-side-line', { clipPath: 'inset(0 0 100% 0)' }, 1.0);
        });

        // Mobile / tablet: mask animation, left side first then right side
        mm.add("(max-width: 1023px)", () => {
            // Initial states: all text masked down, arrows scaled down
            gsap.set('.service-h2-line-1, .service-h2-line-2', { y: "100%" });
            gsap.set('.service-title-left-0, .service-title-left-1, .service-title-right-0, .service-title-right-1', { y: "100%" });
            gsap.set('.service-subtitle-text-left-0, .service-subtitle-text-left-1, .service-subtitle-text-right-0, .service-subtitle-text-right-1', { y: "100%" });
            gsap.set('.service-arrow-right-0, .service-arrow-right-1, .service-arrow-left-0, .service-arrow-left-1', { scale: 0, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceRef.current,
                    start: "top 100%",
                    end: "bottom 99%",
                    scrub: true,
                    invalidateOnRefresh: true
                },
                defaults: { ease: "none" }
            });

            // h2 mask animation with stagger
            tl.to('.service-h2-line-1', { y: 0 }, 0);
            tl.to('.service-h2-line-2', { y: 0 }, 0.1);

            // LEFT side first (top then bottom)
            tl.to('.service-title-left-0', { y: 0 }, 0.4);
            tl.to('.service-subtitle-text-left-0', { y: 0 }, 0.5);
            tl.to('.service-arrow-left-0', { scale: 1, opacity: 1 }, 0.6);

            tl.to('.service-title-left-1', { y: 0 }, 0.8);
            tl.to('.service-subtitle-text-left-1', { y: 0 }, 0.9);
            tl.to('.service-arrow-left-1', { scale: 1, opacity: 1 }, 1.0);

            // RIGHT side afterwards (top then bottom)
            tl.to('.service-title-right-0', { y: 0 }, 1.2);
            tl.to('.service-subtitle-text-right-0', { y: 0 }, 1.3);
            tl.to('.service-arrow-right-0', { scale: 1, opacity: 1 }, 1.4);

            tl.to('.service-title-right-1', { y: 0 }, 1.6);
            tl.to('.service-subtitle-text-right-1', { y: 0 }, 1.7);
            tl.to('.service-arrow-right-1', { scale: 1, opacity: 1 }, 1.8);

            // Scroll-out: reverse order of appearance
            const scrollOutTl = gsap.timeline({
                scrollTrigger: {
                    trigger: serviceRef.current,
                    start: "bottom top",
                    end: "+=1000",
                    scrub: true,
                    invalidateOnRefresh: true
                },
                defaults: { ease: "none" }
            });

            // reverse order: right[1] → right[0] → left[1] → left[0] → h2
            scrollOutTl.to('.service-arrow-right-1', { scale: 0, opacity: 0 }, 0);
            scrollOutTl.to('.service-subtitle-text-right-1', { y: "-100%" }, 0.05);
            scrollOutTl.to('.service-title-right-1', { y: "-100%" }, 0.1);

            scrollOutTl.to('.service-arrow-right-0', { scale: 0, opacity: 0 }, 0.2);
            scrollOutTl.to('.service-subtitle-text-right-0', { y: "-100%" }, 0.25);
            scrollOutTl.to('.service-title-right-0', { y: "-100%" }, 0.3);

            scrollOutTl.to('.service-arrow-left-1', { scale: 0, opacity: 0 }, 0.4);
            scrollOutTl.to('.service-subtitle-text-left-1', { y: "-100%" }, 0.45);
            scrollOutTl.to('.service-title-left-1', { y: "-100%" }, 0.5);

            scrollOutTl.to('.service-arrow-left-0', { scale: 0, opacity: 0 }, 0.6);
            scrollOutTl.to('.service-subtitle-text-left-0', { y: "-100%" }, 0.65);
            scrollOutTl.to('.service-title-left-0', { y: "-100%" }, 0.7);

            scrollOutTl.to('.service-h2-line-2', { y: "-100%" }, 0.8);
            scrollOutTl.to('.service-h2-line-1', { y: "-100%" }, 0.9);
        });

        return () => {
            mm.revert();
        };
    }, { scope: serviceRef });

    return (
        <section ref={serviceRef} id="services" className="section-service w-full flex h-auto flex justify-between">
            <div className='left-side-line w-[1px] h-[100%] bg-[#8b8a8a52] absolute left-[10px] md:left-[31px] z-[100] top-[0px]'></div>
                <div className="w-[100%] service-content relative">
                    <div className='for-headline w-[100%] relative  mb-[0px]'>
                        <h2 className="text-[96px] font-bold text-[#000000BD]">
                            <div className="overflow-hidden block h-fit py-1">
                                <span className="service-h2-line-1 block pb-1">{t.services.title}</span>
                            </div>
                            <div className="overflow-hidden block h-fit py-1">
                                <span className="service-h2-line-2 block pb-1">{t.services.subtitle}</span>
                            </div>
                        </h2>
                        <div className='service-headline-line w-[50%] h-[1px] bg-[#8b8a8a52] absolute left-[0px] bottom-[-50px]'></div>
                    </div>

                    <div className='mobile-line'></div>
                    <div className='services-container flex justify-between w-[100%] items-start'>
                        <div className="left-side-offers relative w-[50%] flex flex-col gap-[200px]">
                            <div className="absolute left-side-mini-line left-[0] top-[27%] bottom-0 w-[40px] h-[1px] bg-[#8b8a8a52] z-0" aria-hidden />
                            <div className="margin-top relative mt-[100px]">
                                <ServiceItem {...leftSideServices[0]} side="left" index={0} isOpen={openId === 'left-0'} onToggle={() => setOpenId(openId === 'left-0' ? null : 'left-0')} />
                                <div className="absolute mini-lines left-0 w-full h-[1px] overflow-hidden transition-[bottom] duration-300 ease-in-out" style={{ bottom: openId === 'left-0' ? LINE_OPEN_BOTTOM : LINE_CLOSED_BOTTOM }} aria-hidden>
                                    <div className="w-full h-full bg-[#8b8a8a52] service-line-left-0 scale-x-0 origin-left" />
                                </div>
                                <div className='mobile-text-bottom-line'></div>
                            </div>
                            <div className="relative">
                                <ServiceItem {...leftSideServices[1]} side="left" index={1} isOpen={openId === 'left-1'} onToggle={() => setOpenId(openId === 'left-1' ? null : 'left-1')} />
                                <div className="absolute mini-lines left-0 w-full h-[1px] overflow-hidden transition-[bottom] duration-300 ease-in-out" style={{ bottom: openId === 'left-1' ? LINE_OPEN_BOTTOM : LINE_CLOSED_BOTTOM }} aria-hidden>
                                    <div className="w-full h-full bg-[#8b8a8a52] service-line-left-1 scale-x-0 origin-left" />
                                </div>
                                <div className='mobile-text-bottom-line'></div>
                            </div>
                        </div>
                        
                        <div className="right-side-offers relative w-[50%] flex flex-col gap-[200px] items-end">
                            <div className="absolute right-side-mini-line right-[0] top-[12%] bottom-0 w-[40px] h-[1px] bg-[#8b8a8a52] z-0" aria-hidden />
                            <div className="relative w-full">
                                <ServiceItem {...rightSideServices[0]} side="right" index={0} isOpen={openId === 'right-0'} onToggle={() => setOpenId(openId === 'right-0' ? null : 'right-0')} />
                                <div className="absolute mini-lines left-0 w-full h-[1px] overflow-hidden transition-[bottom] duration-300 ease-in-out" style={{ bottom: openId === 'right-0' ? LINE_OPEN_BOTTOM : LINE_CLOSED_BOTTOM }} aria-hidden>
                                    <div className="w-full h-full bg-[#8b8a8a52] service-line-right-0 scale-x-0 origin-right" />
                                </div>
                                <div className='mobile-text-bottom-line'></div>
                            </div>
                            <div className="relative w-full">
                                <ServiceItem {...rightSideServices[1]} side="right" index={1} isOpen={openId === 'right-1'} onToggle={() => setOpenId(openId === 'right-1' ? null : 'right-1')} />
                                <div className="absolute mini-lines left-0 w-full h-[1px] overflow-hidden transition-[bottom] duration-300 ease-in-out" style={{ bottom: openId === 'right-1' ? LINE_OPEN_BOTTOM : LINE_CLOSED_BOTTOM }} aria-hidden>
                                    <div className="w-full h-full bg-[#8b8a8a52] service-line-right-1 scale-x-0 origin-right" />
                                </div>
                                <div className='mobile-text-bottom-line'></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            <div className='right-side-line w-[1px] h-[100%] bg-[#8b8a8a52] absolute right-[10px] md:right-[31px] z-[100] top-[0px]'></div>
        </section>
    )
}
