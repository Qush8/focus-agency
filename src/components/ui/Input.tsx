'use client';

import React from "react";

interface InputProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    icon: string;
    placeholder: string;
    type?: string;
    name?: string;
    message?: string;
}

export const Input: React.FC<InputProps> = ({ value, onChange, icon, placeholder, type = 'text', name, message }) => {
    return (
        <div className="relative z-0 w-full group flex flex-col gap-[40px] max-w-[451px]">
            <p className="text-[#FFFFFF] text-[16px] font-weight-[700] line-height-[94%] ">{message}</p>
            <input
                type={type}
                name={name}
                id={name}
                value={value}
                onChange={onChange}
                className="block py-2.5 pb-[12px] pl-[8px] max-w-[451px] w-full text-lg text-[white] bg-transparent border-0 border-b border-[#FFFFFF4D] appearance-none focus:outline-none focus:ring-0  peer relative z-10 placeholder-[#FFFFFF80]  "
                placeholder={placeholder}
            />
            {icon && (
                <div className="absolute right-[18px] bottom-[10px] cursor-pointer z-20">
                    <img
                        src={icon}
                        alt="icon"
                        className={`w-[14px] h-[14px] brightness-0 invert rotate-[45deg] ${
                            icon.includes('face') ? 'rotate-[-360deg]' : ''
                        }`}
                    />
                </div>
            )}
        </div>
    );
};
