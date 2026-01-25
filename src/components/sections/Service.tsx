"use client";
import React, { useState } from 'react';
import '../../app/globals.css';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceItemProps {
    title: string;
    subtitle: string;
    description: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({ title, subtitle, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            <h3 className='text-[76px] text-[#000000D1]'>
                <div>
                    {title}
                </div>
            </h3>
            <div className='flex gap-[10px] cursor-pointer group' onClick={() => setIsOpen(!isOpen)}>
                <p className='text-[32px] text-[#000000AD] transition-colors duration-300 group-hover:text-[#000000]'>
                    {subtitle}
                </p>
                <motion.img 
                    src="/icons/arrow.svg" 
                    alt="" 
                    className='w-[18px] h-[24px] mt-[13px]'
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
    return (
        <section id="services" className="section-service w-full flex h-auto flex justify-between">
            <div className="w-[100%]">
                <div className='for-headline w-[100%] flex justify-start mb-[50px]'>
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
                    <div className='left-side-offers w-[50%] flex flex-col gap-[200px]'>
                        {leftSideServices.map((service, index) => (
                            <div key={index} className={index === 0 ? 'mt-[100px]' : ''}>
                                <ServiceItem {...service} />
                            </div>
                        ))}
                    </div>
                    <div className='right-side-offers w-[50%] flex flex-col gap-[200px]'>
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
