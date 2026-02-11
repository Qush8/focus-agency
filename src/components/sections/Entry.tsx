"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { useLanguage } from "@/context/LanguageContext";

interface EntryProps {
  onEnter: (soundPreference: 'on' | 'off') => void;
}

const handleExit = (callback: () => void) => {
  const tl = gsap.timeline({
    defaults: { duration: 0.6, ease: "power2.in" },
    onComplete: callback,
  });

  tl.to(".entry-title-inner", { y: "100%" }, 0);
  tl.to(".entry-btn-1", { opacity: 0 }, 0);
  tl.to(".entry-btn-2", { opacity: 0 }, 0.1);
  tl.to(".entry-bottom-line", { y: "100%", stagger: 0.1 }, 0);
};

export const Entry: React.FC<EntryProps> = ({ onEnter }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();

  useGSAP(
    () => {
      gsap.set(".entry-title-inner", { y: "100%" });
      gsap.set(".entry-btn-1, .entry-btn-2", { opacity: 0 });
      gsap.set(".entry-bottom-line", { y: "100%" });

      const tl = gsap.timeline({
        defaults: { duration: 0.6, ease: "power2.out" },
        delay: 0.1,
      });

      tl.to(".entry-title-inner", { y: 0 }, 0);
      tl.to(".entry-btn-1", { opacity: 1 }, 0.1);
      tl.to(".entry-btn-2", { opacity: 1 }, 0.2);
      tl.to(".entry-bottom-line", { y: 0, stagger: 0.1 }, 0.3);

      tl.call(() => {
        gsap.set(".entry-title-inner", { clearProps: "y" });
        gsap.set(".entry-btn-1, .entry-btn-2", { clearProps: "opacity" });
        gsap.set(".entry-bottom-line", { clearProps: "y" });
      });
    },
    { scope: sectionRef }
  );

  const handleEnterWithSound = () => {
    handleExit(() => {
      onEnter('on');
    });
  };

  const handleEnterWithoutSound = () => {
    handleExit(() => {
      onEnter('off');
    });
  };

  return (
    <section
      ref={sectionRef}
      className="entry-page fixed inset-0 left-[0] z-150 flex flex-col items-center justify-center w-full h-screen bg-[black] px-4"
      aria-label="Choose how to enter the site"
    >
      <div className="entry-content-wrapper flex flex-col items-center justify-center -translate-y-[50px] md:-translate-y-[100px]">
        <div className="choose-entry-title">
          <h2 className="entry-title text-[#FFFFFF]">
            <div className="overflow-hidden block h-fit py-1">
              <span className="entry-title-inner block pb-1">{t.entry.brand}</span>
            </div>
          </h2>
        </div>
        <div className="entry-buttons-container flex flex-col items-center md:flex-row">
          <div className="entry-btn-wrapper entry-btn-1">
            <Button
              css={
                "entry-button gradient-border bg-[#000000] cursor-[pointer] !duration-200 hover:scale-95"
              }
              text={t.entry.enterSound}
              onClick={handleEnterWithSound}
              galaxyMode={true}
              arrowIcon={true}
              galaxyTopCircleCss={'galaxy-circle-top !shadow-[0_0_10px_10px_rgba(255,255,255,0.5)]'}
              galaxyBottomCircleCss={'galaxy-circle-bottom !shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]'}
            />
          </div>
          <div className="entry-btn-wrapper entry-btn-2">
            <Button
              css={
                "entry-button gradient-border bg-[#000000] cursor-[pointer] !duration-200 hover:scale-95"
              }
              text={t.entry.enterSilent}
              onClick={handleEnterWithoutSound}
              galaxyMode={true}
              arrowIcon={true}
              galaxyTopCircleCss={'galaxy-circle-top-2 !shadow-[0_0_5px_6px_rgba(255,255,255,0.5)]'}
              galaxyBottomCircleCss={'galaxy-circle-bottom-2 !shadow-[0_0_10px_5px_rgba(255,255,255,0.5)]'}
            />
          </div>
        </div>
      </div>
      <div className="bottom-text absolute bottom-[26px] left-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full px-4">
        <h2 className="entry-footer-text font-['Satoshi'] font-normal tracking-[0.06em] text-center uppercase text-[#FFFFFF]">
          <div className="overflow-hidden block h-fit py-1">
            <span className="entry-bottom-line block pb-1">
              {t.entry.slogan.line1}
            </span>
          </div>
          <div className="overflow-hidden block h-fit py-1">
            <span className="entry-bottom-line block pb-1">
              {t.entry.slogan.line2}
            </span>
          </div>
          <div className="overflow-hidden block h-fit py-1">
            <span className="entry-bottom-line block pb-1">
              {t.entry.slogan.line3}
            </span>
          </div>
        </h2>
      </div>
    </section>
  );
};
