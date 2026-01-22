"use client";
import React from 'react';
import { Button } from '../ui/Button';

const SocialIcon = ({ icon, size = 20 }: { icon: string; size?: number }) => (
  <div className="social-icon-wrapper w-[44px] h-[44px] border border-[#464646] rounded-lg flex items-center justify-center hover:border-[#F43E46] transition-all duration-300 group cursor-pointer bg-black">
    <img 
      src={icon} 
      alt="" 
      style={{ width: `${size}px`, height: `${size}px` }}
      className="transition-all duration-300 brightness-0 invert" 
    />
  </div>
);

export const Hero = () => {
  return (
    <section className="section-hero w-full flex flex-col items-start bg-[black] h-[100vh] ">
      <h2 className="text-[white]">
        Increase your sales
      </h2>
      <h1 className="text-[white]">
        <div>Increase your sales and</div>
        <div>brand awareness with</div>
        <div>the <span className="font-[700]">FocusAgency</span> team</div>
      </h1>
      <div className="mt-[44px]">
        <Button css={'gradient-border w-[261px] h-[49px] bg-[#000000] '} text={'SCHEDULE A MEETING'} onClick={() => {console.log('clicked')}} />
      </div>
      <div className='icons flex justify-between w-[100%] mt-[198px] '>
        <div className='left-side-icons w-[40%] flex justify-start gap-[24px]'>
            <SocialIcon icon="/icons/tweet.svg" />
            <SocialIcon icon="/icons/insta.svg" />
            <SocialIcon icon="/icons/face.svg" />
            <SocialIcon icon="/icons/gmail.svg" />
        </div>
        <div className='right-side-icons w-[40%] flex justify-end'>
          <SocialIcon icon="/icons/pause.svg" size={15} />
        </div>
      </div>
    </section>
  );
};
