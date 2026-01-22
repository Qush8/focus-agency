import React from 'react';
import "../../app/globals.css";

export const Navbar = () => {
  return (
    <nav className="flex justify-between items-center bg-[black] h-[125px] top-0 z-50">
      <div className="h-full text-xl font-bold text-[white] flex items-center">
        <img 
          src="/images/focus_agency_logo.svg" 
          alt="FocusAgency Logo" 
          className="h-full w-auto"
        />
      </div>
      <div className="flex h-full items-center">
        <a href="#" className="hover:text-white transition-colors text-[white] text-12">We are</a>
        <a href="#" className="hover:text-white transition-colors text-[white] text-12">Services</a>
        <a href="#" className="hover:text-white transition-colors text-[white] text-12">Blog</a>
        <a href="#" className="hover:text-white transition-colors text-[white] text-12">Contact</a>
      </div>
      <div className="h-full flex items-center">
        <a href="#" className="text-[white] text-12">ქართ</a>
        <a href="#" className="text-[white] text-12">ENG</a>
      </div>
    </nav>
  );
};
