"use client";
import React, { useState, useRef } from 'react';
import '../../app/globals.css';
import { motion, AnimatePresence } from 'framer-motion';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ServiceItemProps {
    title: string;
    subtitle: string;
    description: string;
    side: 'left' | 'right';
    index: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, subtitle, description, side, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <h3 className={`text-[76px] text-[#000000D1] service-title-${side}-${index}`}>
                <div>
                    {title}
                </div>
            </h3>
            <div className={`flex gap-[10px] cursor-pointer group service-subtitle-${side}-${index}`} onClick={() => setIsOpen(!isOpen)}>
                <p className={`text-[32px] text-[#000000AD] transition-colors duration-300 group-hover:text-[#000000] service-subtitle-text-${side}-${index}`}>
                    {subtitle}
                </p>
                <motion.img 
                    src="/icons/arrow.svg" 
                    alt="" 
                    className={`w-[18px] h-[24px] mt-[13px] service-arrow-${side}-${index}`}
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3 }}
                />
            </div>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="overflow-hidden absolute top-full left-0 w-full z-10 bg-white"
                    >
                        <div className="pt-4 pb-2">
                             <p className='text-[24px] text-[#00000090] font-light leading-relaxed max-w-full md:max-w-[80%]'>
                                {description}
                            </p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
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
    const serviceRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        // Set initial hidden states
        gsap.set('.service-h2-line-1, .service-h2-line-2', { y: "100%" });
        gsap.set('.service-title-right-0, .service-title-right-1', { x: 100 });
        gsap.set('.service-title-left-0, .service-title-left-1', { x: -100 });
        gsap.set('.service-subtitle-text-right-0, .service-subtitle-text-right-1', { x: 100 });
        gsap.set('.service-subtitle-text-left-0, .service-subtitle-text-left-1', { x: -100 });
        gsap.set('.service-arrow-right-0, .service-arrow-right-1, .service-arrow-left-0, .service-arrow-left-1', { scale: 0 });

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

        // right[0] title (right-to-left)
        tl.to('.service-title-right-0', { x: 0 }, 0.2);
        // right[0] subtitle text (right-to-left)
        tl.to('.service-subtitle-text-right-0', { x: 0 }, 0.3);
        // right[0] arrow (scale) - last for right[0]
        tl.to('.service-arrow-right-0', { scale: 1 }, 0.4);

        // left[0] title (left-to-right) - starts after right[0] arrow
        tl.to('.service-title-left-0', { x: 0 }, 0.5);
        // left[0] subtitle text (left-to-right)
        tl.to('.service-subtitle-text-left-0', { x: 0 }, 0.6);
        // left[0] arrow (scale) - last for left[0]
        tl.to('.service-arrow-left-0', { scale: 1 }, 0.7);

        // right[1] title (right-to-left)
        tl.to('.service-title-right-1', { x: 0 }, 0.8);
        // right[1] subtitle text (right-to-left)
        tl.to('.service-subtitle-text-right-1', { x: 0 }, 0.9);
        // right[1] arrow (scale) - last for right[1]
        tl.to('.service-arrow-right-1', { scale: 1 }, 1.0);

        // left[1] title (left-to-right)
        tl.to('.service-title-left-1', { x: 0 }, 1.1);
        // left[1] subtitle text (left-to-right)
        tl.to('.service-subtitle-text-left-1', { x: 0 }, 1.2);
        // left[1] arrow (scale) - last overall
        tl.to('.service-arrow-left-1', { scale: 1 }, 1.3);

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

        // Reverse order: last appeared → first appeared
        // left[1] (last)
        scrollOutTl.to('.service-arrow-left-1', { scale: 0 }, 0);
        scrollOutTl.to('.service-subtitle-text-left-1', { x: -100 }, 0.05);
        scrollOutTl.to('.service-title-left-1', { x: -100 }, 0.1);

        // right[1]
        scrollOutTl.to('.service-arrow-right-1', { scale: 0 }, 0.2);
        scrollOutTl.to('.service-subtitle-text-right-1', { x: 100 }, 0.25);
        scrollOutTl.to('.service-title-right-1', { x: 100 }, 0.3);

        // left[0]
        scrollOutTl.to('.service-arrow-left-0', { scale: 0 }, 0.4);
        scrollOutTl.to('.service-subtitle-text-left-0', { x: -100 }, 0.45);
        scrollOutTl.to('.service-title-left-0', { x: -100 }, 0.5);

        // right[0]
        scrollOutTl.to('.service-arrow-right-0', { scale: 0 }, 0.6);
        scrollOutTl.to('.service-subtitle-text-right-0', { x: 100 }, 0.65);
        scrollOutTl.to('.service-title-right-0', { x: 100 }, 0.7);

        // h2 (first appeared)
        scrollOutTl.to('.service-h2-line-2', { y: "-100%" }, 0.8);
        scrollOutTl.to('.service-h2-line-1', { y: "-100%" }, 0.9);

    }, { scope: serviceRef });

    return (
        <section ref={serviceRef} id="services" className="section-service w-full flex h-auto flex justify-between">
            <div className="w-[100%]">
                <div className='for-headline w-[100%] flex justify-start mb-[50px]'>
                    <h2 className="text-[96px] font-bold text-[#000000BD]">
                        <div className="overflow-hidden block h-fit py-1">
                            <span className="service-h2-line-1 block pb-1">We offer full digital</span>
                        </div>
                        <div className="overflow-hidden block h-fit py-1">
                            <span className="service-h2-line-2 block pb-1">services</span>
                        </div>
                    </h2>
                </div>
                <div className='services-container flex justify-between w-[100%] items-start'>
                    <div className='left-side-offers w-[50%] flex flex-col gap-[200px]'>
                        {leftSideServices.map((service, index) => (
                            <div key={index} className={index === 0 ? 'mt-[100px]' : ''}>
                                <ServiceItem {...service} side="left" index={index} />
                            </div>
                        ))}
                    </div>
                    <div className='right-side-offers w-[50%] flex flex-col gap-[200px] items-end'>
                        {rightSideServices.map((service, index) => (
                            <div key={index}>
                                <ServiceItem {...service} side="right" index={index} />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
