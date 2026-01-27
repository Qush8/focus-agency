"use client";
import React, { useState, useRef } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        <div className={`w-[100%] h-[300px] border border-b-[#FFFFFFBD] flex pl-[30px] pt-[30px] pb-[30px] gap-[5px] about-border-item-${index}`}>
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

const aboutItems = [
    {
        number: "01",
        title: "Initial Consultation",
        subtitle: "Desktop Publishing Software Like",
        description: "Letraset sheets containing Lorem Ipsum passages , and more recentlu with desktop publishing"
    },
    {
        number: "02",
        title: "Strategy Development and Implementation",
        subtitle: "Desktop Publishing Software Like",
        description: "Letraset sheets containing Lorem Ipsum passages , and more recentlu with desktop publishing"
    },
    {
        number: "03",
        title: "Review and Final Refinement",
        subtitle: "Desktop Publishing Software Like",
        description: "Letraset sheets containing Lorem Ipsum passages , and more recentlu with desktop publishing"
    }
];

export const About = () => {
    const aboutRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Set initial hidden states
        gsap.set('.about-border-main, .about-border-left, .about-border-item-0, .about-border-item-1, .about-border-item-2', { opacity: 0 });
        gsap.set('.about-h2-text', { y: "100%" });
        gsap.set('.about-button', { scale: 0 });
        gsap.set('.about-title-0, .about-title-1, .about-title-2', { x: 100 });
        gsap.set('.about-subtitle-0, .about-subtitle-1, .about-subtitle-2', { x: 100 });
        gsap.set('.about-arrow-0, .about-arrow-1, .about-arrow-2', { scale: 0 });
        gsap.set('.about-number-0, .about-number-1, .about-number-2', { y: "100%" });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: aboutRef.current,
                start: "top 99%",
                end: "bottom 80%",
                scrub: true,
                invalidateOnRefresh: true
            },
            defaults: { ease: "none" }
        });

        // Borders
        tl.to('.about-border-main, .about-border-left, .about-border-item-0, .about-border-item-1, .about-border-item-2', { opacity: 1 }, 0);

        // Left side h2 and button - appear faster
        tl.to('.about-h2-text', { y: 0 }, 0.4);
        tl.to('.about-button', { scale: 1 }, 0.5);

        // Right side item[0] title + subtitle
        tl.to('.about-title-0', { x: 0 }, 0.1);
        tl.to('.about-subtitle-0', { x: 0 }, 0.2);

        // Right side item[0] number then arrow - appear earlier
        tl.to('.about-number-0', { y: 0 }, 0.3);
        tl.to('.about-arrow-0', { scale: 1 }, 0.15);

        // 1s delay, then item[1] (starts at 1.15 = 0.15 + 1s)
        tl.to('.about-title-1', { x: 0 }, 0.5);
        tl.to('.about-subtitle-1', { x: 0 }, 0.6);
        tl.to('.about-number-1', { y: 0 }, 0.7);
        tl.to('.about-arrow-1', { scale: 1 }, 0.8);

        // 1s delay, then item[2] (starts at 2.15 = 1.15 + 1s)
        tl.to('.about-title-2', { x: 0 }, 0.7);
        tl.to('.about-subtitle-2', { x: 0 }, 0.8);
        tl.to('.about-number-2', { y: 0 }, 0.9);
        tl.to('.about-arrow-2', { scale: 1 }, 0.9);

    }, { scope: aboutRef });

    return (
        <section ref={aboutRef} id="about" className="section-about w-full flex justify-between bg-[black]">
            <div className="w-[100%] flex border border-[#FFFFFFBD] about-border-main">
                <div className="left-side-about w-[40%] border border-r-[#FFFFFFBD] flex justify-center flex-col items-start pr-[50px] pl-[40px] about-border-left">
                    <h2 className="text-[96px] font-bold text-[#FFFFFFF0] leading-none">
                        <div className="overflow-hidden block h-fit py-1">
                            <span className="about-h2-text block pb-1">Flow to work</span>
                        </div>
                    </h2>
                    <div className="about-button w-full flex justify-center mt-[46px]">
                        <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000]'} text={'SCHEDULE A MEETING'} onClick={() => {}} />
                    </div>
                </div>
                <div className="right-side-about w-[60%] flex flex-col ">
                    {aboutItems.map((item, index) => (
                        <AboutItem key={index} {...item} index={index} />
                    ))}
                </div>
            </div>
        </section>
    )
}
