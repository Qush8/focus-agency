'use client'
import React, { useState } from 'react';
import "../../app/globals.css";

export const Navbar = () => {
  const [activeLanguage, setActiveLanguage] = useState('en');
  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
      <nav className=" h-[125px] w-full max-w-[1920px] flex justify-between items-center">
        <div className="logo h-full text-xl font-bold text-[white] flex items-center">
          <img 
            src="/images/focus_agency_logo.svg" 
            alt="FocusAgency Logo" 
            className="h-full w-auto"
          />
        </div>
        <div className="nav-links flex h-full items-center">
          <a href="#about" className="hover:text-white transition-colors text-[white] text-12">We are</a>
          <a href="#services" className="hover:text-white transition-colors text-[white] text-12">Services</a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">Blog</a>
          <a href="#" className="hover:text-white transition-colors text-[white] text-12">Contact</a>
        </div>
        <div className="language-links h-full flex items-center">
          <a href="#" onClick={() => setActiveLanguage('ka')} className={` ${activeLanguage === 'ka' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}>ქარ</a>
          <a href="#" onClick={() => setActiveLanguage('en')} className={` ${activeLanguage === 'en' ? '!text-[white]' : '!text-[#FFFFFF8F]'} text-12 `}>ENG</a>
        </div>
      </nav>
    </div>
  );
};
