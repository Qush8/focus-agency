import React from 'react';

export const Footer = () => {
  return (
    <footer className="w-full py-8 px-6 border-t border-white/10 text-center text-sm text-gray-500 bg-[red] w-[200px] h-[200px]">
      <p className="text-[white]">&copy; {new Date().getFullYear()} Brand. All rights reserved.</p>
      
    </footer>
  );
};
