"use client";

import React from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    css?: string;
}

export const Button : React.FC<ButtonProps> = ({ text, onClick, css = '' }) => {
    return (
        <button className={`flex items-center justify-center gap-[9px] text-[black] px-6 py-3 font-medium ${css} text-[white]`} onClick={onClick}>
            <img src="/icons/star.svg" alt="" className="w-[9px] h-[9px]" />
            {text}
        </button>
    )
}