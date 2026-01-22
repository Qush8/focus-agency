"use client";
import React, { useState } from 'react';
import { Button } from "../ui/Button";
import { motion, AnimatePresence } from 'framer-motion';

interface AboutItemProps {
    number: string;
    title: string;
    subtitle: string;
    description: string;
}

const AboutItem: React.FC<AboutItemProps> = ({ number, title, subtitle, description }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="w-[100%] h-[300px] border border-b-[#FFFFFFBD]  flex pl-[30px] pt-[30px] pb-[30px] gap-[5px]">
            <div className="">
                <p className="text-[32px] font-bold text-[#FFFFFFE5]">{number}</p>
            </div>
            <div className="w-[90%] mt-[20px] flex flex-col ">
                <div className="cursor-pointer w-full" onClick={() => setIsOpen(!isOpen)}>
                    <h3 className="text-[44px] font-bold text-[#FFFFFFEB] mb-[20px]">
                        <div>{title}</div>
                    </h3>
                    <div className="flex justify-between items-center w-full">
                        <p className="text-[28px] font-light text-[#FFFFFFCF]">
                            {subtitle}
                        </p>
                        <motion.img 
                            src="/icons/arrow.svg" 
                            alt="Expand" 
                            className={`w-[18px] h-[24px] ${isOpen ? 'filter-red' : 'brightness-0 invert'}`}
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
        title: "Initial Consultation",
        subtitle: "Desktop Publishing Software Like",
        description: "Letraset sheets containing Lorem Ipsum passages , and more recentlu with desktop publishing"
    }
];

export const About = () => {
    return (
        <section id="about" className="section-about w-full flex justify-between bg-[black]">
            <div className="w-[100%] flex border border-[#FFFFFFBD]">
                <div className="left-side-about w-[40%] border border-r-[#FFFFFFBD] flex justify-center flex-col items-start pr-[50px] pl-[40px]">
                    <h2 className="text-[96px] font-bold text-[#FFFFFFF0] leading-none">
                        <div>
                            Flow to work
                        </div>
                    </h2>
                    <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] mt-[46px] mx-auto'} text={'SCHEDULE A MEETING'} onClick={() => {}} />
                </div>
                <div className="right-side-about w-[60%] flex flex-col ">
                    {aboutItems.map((item, index) => (
                        <AboutItem key={index} {...item} />
                    ))}
                </div>
            </div>
        </section>
    )
}
