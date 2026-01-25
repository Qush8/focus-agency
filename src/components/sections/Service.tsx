"use client";
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import '../../app/globals.css';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItemProps {
    title: string;
    subtitle: string;
    description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, subtitle, description }) => {
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
                    { height: "auto", opacity: 1, duration: 0.5, ease: "power2.inOut" }
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
                    duration: 0.5,
                    ease: "power2.inOut"
                });
            }
        }
    }, [isOpen]);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div ref={itemRef} className="relative">
            <h3 className='text-[76px] text-[#000000D1]'>
                <div>
                    {title}
                </div>
            </h3>
            <div className='flex gap-[10px] cursor-pointer group' onClick={handleClick}>
                <p className='text-[32px] text-[#000000AD] transition-colors duration-300 group-hover:text-[#000000]'>
                    {subtitle}
                </p>
                <img 
                    ref={arrowRef}
                    src="/icons/arrow.svg" 
                    alt="" 
                    className='w-[18px] h-[24px] mt-[13px]'
                />
            </div>
            <div 
                ref={contentRef}
                className="overflow-hidden absolute top-full left-0 w-full z-10 bg-white"
                style={{ height: 0, opacity: 0 }}
            >
                <div className="pt-4 pb-2">
                     <p className='text-[24px] text-[#00000090] font-light leading-relaxed max-w-full md:max-w-[80%]'>
                        {description}
                    </p>
                </div>
            </div>
        </div>
    );
};

const leftSideServices = [
    {
        title: "Social Media Marketing",
        subtitle: "Content creation and advertising",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
    },
    {
        title: "Social Media Marketing",
        subtitle: "Content creation and advertising",
        description: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

const rightSideServices = [
    {
        title: "Social Media Marketing",
        subtitle: "Content creation and advertising",
        description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
    },
    {
        title: "Social Media Marketing",
        subtitle: "Content creation and advertising",
        description: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet."
    }
];

export const Service = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const headlineRef = useRef<HTMLDivElement>(null);
    const leftServicesRef = useRef<HTMLDivElement>(null);
    const rightServicesRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            gsap.from(headlineRef.current, {
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(leftServicesRef.current?.children || [], {
                opacity: 0,
                x: -50,
                duration: 0.8,
                stagger: 0.3,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none none"
                }
            });

            gsap.from(rightServicesRef.current?.children || [], {
                opacity: 0,
                x: 50,
                duration: 0.8,
                stagger: 0.3,
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
        <section ref={sectionRef} id="services" className="section-service w-full flex h-auto flex justify-between">
            <div className="w-[100%]">
                <div ref={headlineRef} className='for-headline w-[100%] flex justify-start mb-[50px]'>
                    <h2 className="text-[96px] font-bold text-[#000000BD]">
                        <div>
                            We offer full digital
                        </div>
                        <div>
                            services
                        </div>
                    </h2>
                </div>
                <div className='services-container flex justify-between w-[100%] items-start'>
                    <div ref={leftServicesRef} className='left-side-offers w-[50%] flex flex-col gap-[200px]'>
                        {leftSideServices.map((service, index) => (
                            <div key={index} className={index === 0 ? 'mt-[100px]' : ''}>
                                <ServiceItem {...service} />
                            </div>
                        ))}
                    </div>
                    <div ref={rightServicesRef} className='right-side-offers w-[50%] flex flex-col gap-[200px]'>
                        {rightSideServices.map((service, index) => (
                            <div key={index}>
                                <ServiceItem {...service} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
