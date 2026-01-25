"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from "../ui/Button";

gsap.registerPlugin(ScrollTrigger);

interface AboutItemProps {
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

const AboutItem: React.FC<AboutItemProps> = ({ number, title, subtitle, description }) => {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef<HTMLDivElement>(null);
    const arrowRef = useRef<HTMLImageElement>(null);
    const itemRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (contentRef.current && arrowRef.current) {
            if (isOpen) {
                gsap.to(arrowRef.current, {
                    rotation: 45,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.fromTo(contentRef.current, 
                    { height: 0, opacity: 0 },
                    { height: "auto", opacity: 1, duration: 0.3, ease: "power2.inOut" }
                );
            } else {
                gsap.to(arrowRef.current, {
                    rotation: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
                gsap.to(contentRef.current, {
                    height: 0,
                    opacity: 0,
                    duration: 0.3,
                    ease: "power2.inOut"
                });
            }
        }
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={itemRef} className="w-[100%] h-[300px] border border-b-[#FFFFFFBD]  flex pl-[30px] pt-[30px] pb-[30px] gap-[5px]">
            <div className="">
                <p className="text-[32px] font-bold text-[#FFFFFFE5]">{number}</p>
            </div>
            <div className="w-[90%] mt-[20px] flex flex-col ">
                <div className="cursor-pointer w-full" onClick={handleClick}>
                    <h3 className="text-[44px] font-bold text-[#FFFFFFEB] mb-[20px]">
                        <div>{title}</div>
                    </h3>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-[28px] font-light text-[#FFFFFFCF]">
                            {subtitle}
                        </p>
                        <img 
                            ref={arrowRef}
                            src="/icons/arrow.svg" 
                            alt="Expand" 
                            className={`w-[18px] h-[24px] ${isOpen ? 'filter-red' : 'brightness-0 invert'}`}
                        />
                    </div>
                </div>
                
                <div ref={contentRef} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                    <div className="pt-[30px] text-[24px] font-light text-[#FFFFFFCF] leading-relaxed max-w-[90%]">
                        {description}
                    </div>
                </div>
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
    const sectionRef = useRef<HTMLElement>(null);
    const leftSideRef = useRef<HTMLDivElement>(null);
    const rightSideRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(leftSideRef.current, {
                opacity: 0,
                x: -50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(rightSideRef.current?.children || [], {
                opacity: 0,
                x: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="section-about w-full flex justify-between bg-[black]">
            <div className="w-[100%] flex border border-[#FFFFFFBD]">
                <div ref={leftSideRef} className="left-side-about w-[40%] border border-r-[#FFFFFFBD] flex justify-center flex-col items-start pr-[50px] pl-[40px]">
                    <h2 className="text-[96px] font-bold text-[#FFFFFFF0] leading-none">
                        <div>
                            Flow to work
                        </div>
                    </h2>
                    <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] mt-[46px] mx-auto'} text={'SCHEDULE A MEETING'} onClick={() => {}} />
                </div>
                <div ref={rightSideRef} className="right-side-about w-[60%] flex flex-col ">
                    {aboutItems.map((item, index) => (
                        <AboutItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
