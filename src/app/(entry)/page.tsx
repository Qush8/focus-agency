"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";

const SOUND_PREFERENCE_KEY = "soundPreference";

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

const handleEnterWithSound = (router: ReturnType<typeof useRouter>) => {
  handleExit(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SOUND_PREFERENCE_KEY, "on");
    }
    router.push("/landing");
  });
};

const handleEnterWithoutSound = (router: ReturnType<typeof useRouter>) => {
  handleExit(() => {
    if (typeof window !== "undefined") {
      sessionStorage.setItem(SOUND_PREFERENCE_KEY, "off");
    }
    router.push("/landing");
  });
};

export default function EntryPage() {
  const router = useRouter();
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

  return (
    <section
      ref={sectionRef}
      className="entry-page flex flex-col items-center justify-center w-[100%] h-[100vh] bg-[black] relative px-4"
      aria-label="Choose how to enter the site"
    >
      <div className="entry-content-wrapper flex flex-col items-center justify-center -translate-y-[50px] md:-translate-y-[100px]">
        <div className="choose-entry-title">
          <h1 className="entry-title text-[#FFFFFF]">
            <div className="overflow-hidden block h-fit py-1">
              <span className="entry-title-inner block pb-1">{t.entry.brand}</span>
            </div>
          </h1>
        </div>
        <div className="entry-buttons-container flex flex-col items-center md:flex-row">
          <div className="entry-btn-wrapper entry-btn-1">
            <Button
              css={
                "entry-button gradient-border bg-[#000000] cursor-[pointer] !duration-200 hover:scale-95"
              }
              text={t.entry.enterSound}
              onClick={() => handleEnterWithSound(router)}
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
              onClick={() => handleEnterWithoutSound(router)}
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
}
