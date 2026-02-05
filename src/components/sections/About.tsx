"use client";
import React, { useState, useRef } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

interface AboutItemProps {
    number: string;
    title: string;
    subtitle: string;
    description: string;
    index: number;
}

const AboutItem: React.FC<AboutItemProps> = ({ number, title, subtitle, description, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={`w-[100%] h-[300px] flex pl-[30px] pt-[30px] pb-[30px] gap-[5px] about-border-item-${index}`}>
            <div className="">
                <p className={`text-[32px] font-bold text-[#FFFFFFE5] about-number-${index}`}>{number}</p>
            </div>
            <div className="w-[90%] mt-[20px] flex flex-col ">
                <div className="cursor-pointer w-full" onClick={() => setIsOpen(!isOpen)}>
                    <h3 className={`text-[44px] font-bold text-[#FFFFFFEB] mb-[20px] about-title-${index}`}>
                        <div>{title}</div>
                    </h3>
                    <div className="flex justify-between items-center w-full">
                        <p className={`text-[28px] font-light text-[#FFFFFFCF] about-subtitle-${index}`}>
                            {subtitle}
                        </p>
                        <motion.img 
                            src="/icons/arrow.svg" 
                            alt="Expand" 
                            className={`w-[18px] h-[24px] about-arrow-${index} ${isOpen ? 'filter-red' : 'brightness-0 invert'}`}
                            animate={{ rotate: isOpen ? 45 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
                
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="overflow-hidden"
                        >
                            <div className="pt-[30px] text-[24px] font-light text-[#FFFFFFCF] leading-relaxed max-w-[90%]">
                                {description}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export const About = () => {
    const aboutRef = useRef<HTMLElement>(null);
    const { t } = useLanguage();

    const aboutItems = t.about.items.map((item, index) => ({
        ...item,
        number: `0${index + 1}`
    }));

    useGSAP(() => {
        // Set initial hidden states
        gsap.set('.about-border-main, .about-border-left, .about-border-item-0, .about-border-item-1, .about-border-item-2', { opacity: 0 });
        gsap.set('.about-h2-text', { y: "100%" });
        gsap.set('.about-button', { scale: 0 });
        gsap.set('.about-title-0, .about-title-1, .about-title-2', { x: 100 });
        gsap.set('.about-subtitle-0, .about-subtitle-1, .about-subtitle-2', { x: 100 });
        gsap.set('.about-arrow-0, .about-arrow-1, .about-arrow-2', { scale: 0 });
        gsap.set('.about-number-0, .about-number-1, .about-number-2', { y: "100%" });

        // Lines initial state (vertical lines: inner div scaleY 0 = grow from top)
        gsap.set('.section-about .left-side-line-inner, .section-about .right-side-line-inner', { scaleY: 0, transformOrigin: 'top' });
        gsap.set('.section-about .about-left-inner-line', { scaleY: 0, transformOrigin: 'top' });
        gsap.set('.top-about-line', { scaleX: 0, transformOrigin: 'left' });
        gsap.set('.bottom-about-line', { scaleX: 0, transformOrigin: 'left' });
        gsap.set('.about-right-line-0, .about-right-line-1', { scaleX: 0, transformOrigin: 'right' });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 82%",
                end: "bottom 85%",
                scrub: true,
                invalidateOnRefresh: true
            },
            defaults: { ease: "none" }
        });

        // 1) პირველ რიგში — ვერტიკალური ხაზები scaleY-ით ზემოდან ქვემოთ
        tl.fromTo('.section-about .left-side-line-inner, .section-about .right-side-line-inner',
            { scaleY: 0, transformOrigin: 'top' },
            { scaleY: 1, duration: 0.9, ease: 'power2.inOut' },
            0
        );

        // 2) მათ შემდეგ — borders, top line, inner line, content
        tl.to('.about-border-main, .about-border-left, .about-border-item-0, .about-border-item-1, .about-border-item-2', { opacity: 1 }, 0.35);
        tl.fromTo('.top-about-line', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.4 }, 0.35);
        tl.fromTo('.section-about .about-left-inner-line', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.8 }, 0.4);

        tl.to('.about-h2-text', { y: 0 }, 0.5);
        tl.to('.about-button', { scale: 1 }, 0.55);

        tl.to('.about-title-0', { x: 0 }, 0.45);
        tl.to('.about-subtitle-0', { x: 0 }, 0.5);
        tl.to('.about-number-0', { y: 0 }, 0.55);
        tl.to('.about-arrow-0', { scale: 1 }, 0.5);

        tl.fromTo('.about-right-line-0', { scaleX: 0, transformOrigin: 'right' }, { scaleX: 1, duration: 0.35 }, 0.6);

        tl.to('.about-title-1', { x: 0 }, 0.65);
        tl.to('.about-subtitle-1', { x: 0 }, 0.7);
        tl.to('.about-number-1', { y: 0 }, 0.75);
        tl.to('.about-arrow-1', { scale: 1 }, 0.8);

        tl.fromTo('.about-right-line-1', { scaleX: 0, transformOrigin: 'right' }, { scaleX: 1, duration: 0.35 }, 0.9);

        tl.to('.about-title-2', { x: 0 }, 0.85);
        tl.to('.about-subtitle-2', { x: 0 }, 0.9);
        tl.to('.about-number-2', { y: 0 }, 0.95);
        tl.to('.about-arrow-2', { scale: 1 }, 0.95);

        tl.fromTo('.bottom-about-line', { scaleX: 0, transformOrigin: 'left' }, { scaleX: 1, duration: 0.5 }, 1.1);

        // Scroll-out timeline (reverse line animations when section exits viewport)
        const scrollOutTl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "bottom top",
                end: "+=800",
                scrub: true,
                invalidateOnRefresh: true
            },
            defaults: { ease: "none" }
        });

        scrollOutTl.to('.bottom-about-line', { scaleX: 0, duration: 0.1 }, 0);
        scrollOutTl.to('.about-right-line-1', { scaleX: 0, duration: 0.08 }, 0.05);
        scrollOutTl.to('.about-right-line-0', { scaleX: 0, duration: 0.08 }, 0.1);
        scrollOutTl.to('.top-about-line', { scaleX: 0, duration: 0.1 }, 0.15);
        scrollOutTl.to('.section-about .left-side-line-inner, .section-about .right-side-line-inner', { scaleY: 0, duration: 0.5 }, 0.2);
        scrollOutTl.to('.section-about .about-left-inner-line', { scaleY: 0, duration: 0.6 }, 0.2);

    }, { scope: aboutRef });

    return (
        <section ref={aboutRef} id="about" className="section-about relative w-full flex justify-between bg-[black]">
        <div className='left-side-line w-[1px] h-[100%] absolute left-[10px] md:left-[31px] z-[100] top-[0px] overflow-hidden' aria-hidden>
            <div className='left-side-line-inner w-full h-full bg-[#FFFFFF33] origin-top' />
        </div>
        <div className='right-side-line w-[1px] h-[100%] absolute right-[10px] md:right-[31px] z-[100] top-[0px] overflow-hidden' aria-hidden>
            <div className='right-side-line-inner w-full h-full bg-[#FFFFFF33] origin-top' />
        </div>
       
            <div className={`about-container w-[100%] relative`}>
            <div className="top-about-line w-[100%] absolute top-[0] left-[0] right-[0] h-[1px] bg-[#FFFFFF33] overflow-hidden" aria-hidden></div>
           
                <div className="w-[100%] flex  about-border-main">
                    <div className="left-side-about w-[40%]  relative flex justify-center flex-col items-start pr-[50px] pl-[40px] about-border-left">
                        <div className="absolute top-[0] right-[0] w-[1px] h-full overflow-hidden" aria-hidden>
                            <div className="about-left-inner-line w-full h-full bg-[#FFFFFF33] origin-top" aria-hidden />
                        </div>
                        <h2 className="text-[96px] font-bold text-[#FFFFFFF0] leading-none">
                            <div className="overflow-hidden block h-fit py-1">
                                <span className="about-h2-text block pb-1">{t.about.title}</span>
                            </div>
                        </h2>
                        <div className="about-button w-full flex justify-center mt-[46px]">
                            <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000]'} text={t.about.cta} onClick={() => {}} />
                        </div>
                    </div>
                    <div className="right-side-about w-[60%] flex flex-col ">
                        {aboutItems.map((item, index) => (
                            <AboutItem key={index} {...item} index={index} />
                        ))}
                    </div>
                </div>
            <div className="bottom-about-line w-[100%] absolute bottom-[0] left-[0] right-[0] h-[1px] bg-[#FFFFFF33] overflow-hidden" aria-hidden></div>
            </div>

            <div className="about-right-line-0 w-[59.3%] h-[1px] bg-[#FFFFFF33] top-[39%] absolute right-[0] overflow-hidden" aria-hidden></div>
            <div className="about-right-line-1 w-[59.3%] h-[1px] bg-[#FFFFFF33] top-[70%] absolute right-[0] overflow-hidden" aria-hidden></div>

        </section>
    )
}
