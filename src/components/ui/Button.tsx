"use client";

import React, { Fragment } from 'react';

interface ButtonProps {
    text: string;
    onClick?: () => void;
    css?: string;
    galaxyMode?: boolean;
}

export const Button : React.FC<ButtonProps> = ({ text, onClick, css = '', galaxyMode }) => {
    return (
        <Fragment>

            <div className={`for-button-animation relative group ${galaxyMode &&  'pt-[20px] pb-[15px]'}`}>

                {galaxyMode && (
                <div className='w-[15px] h-[15px] absolute left-[30%] min-[431px]:top-[25px] top-[22px] rounded-full shadow-[0_0_10px_5px_var(--tw-shadow-color,#ffffffe6)] min-[431px]:shadow-[0_0_20px_10px_rgba(255,255,255,0.9)] z-[-1] transition-all duration-300 ease-in-out group-hover:left-[80%]'></div>
                )}

                <button className={`flex cursor-[pointer] items-center justify-center gap-[9px] text-[black] px-6 py-3 font-medium ${css} text-[white] group-hover:text-[#F43E46] `} onClick={onClick}>
                    <img src="/icons/star.svg" alt="" className={`w-[9px] h-[9px] transition-transform duration-500 ease-in-out ${galaxyMode ? 'group-hover:rotate-180 group-hover:[filter:brightness(0)_saturate(100%)_invert(32%)_sepia(89%)_saturate(2768%)_hue-rotate(338deg)_brightness(99%)_contrast(92%)]' : ''}`} />
                    {text}
                </button>

                {galaxyMode && (
                    <div className='w-[10px] h-[10px] absolute left-[15%] min-[431px]:bottom-[28px] bottom-[20px] rounded-full shadow-[0_0_10px_5px_var(--tw-shadow-color,#ffffffe6)] min-[431px]:shadow-[0_0_20px_10px_rgba(255,255,255,0.9)] z-[-1] transition-all duration-300 ease-in-out '></div>
                )}

                
            </div>
        </Fragment>
    )
}