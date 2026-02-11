'use client';
import React, { useState, useRef } from 'react';
import Form from '../ui/Form';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/context/LanguageContext';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const { t } = useLanguage();
  const [value, setValue] = useState({
    name: '',
    email: '',
    message: '',
});

  const inputFields = [
    {
        icon: '/icons/arrow.svg',
        type: 'text',
        value: value.name,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, name: e.target.value }),
        placeholder: t.footer.form.namePlaceholder,
        message: t.footer.form.nameError,
        name: 'full_name',
    },
    {
        icon: '/icons/arrow.svg',
        type: 'email',
        value: value.email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, email: e.target.value }),
        placeholder: t.footer.form.emailPlaceholder,
        message: t.footer.form.emailError,
        name: 'email',
    },
    {
        icon: '/icons/telegram.svg',
        type: 'text',
        value: value.message,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, message: e.target.value }),
        placeholder: t.footer.form.messagePlaceholder,
        message: t.footer.form.messageError,
        name: 'message',
    },
]

  useGSAP(() => {
    const mm = gsap.matchMedia();

    const createFooterAnimation = (startTrigger: string, endTrigger: string, staggerAmount: number) => {
        // Set initial hidden states
        gsap.set('.footer-line-top', { scaleX: 0, transformOrigin: 'center' });
        gsap.set('.footer-h2-text', { y: "100%" });
        gsap.set('.footer-form-message-0, .footer-form-message-1, .footer-form-message-2', { x: -100, opacity: 0 });
        gsap.set('.footer-form-input-0, .footer-form-input-1, .footer-form-input-2', { x: -100, opacity: 0 });
        gsap.set('.footer-call-us-text, .footer-phone-number, .footer-visit-us-text, .footer-tbilisi-text, .footer-address-text, .footer-connect-text, .footer-email-text, .footer-home-text, .footer-link-we-are, .footer-link-service, .footer-link-blog, .footer-link-contact', { y: "100%" });
        gsap.set('.copyright-up-line, .copyright-down-line', { scaleX: 0, transformOrigin: 'center' });
        gsap.set('.copyright-text', { y: "100%" });

        // Scrub: progress = scroll position → scroll up and content starts disappearing immediately
        const tweenDuration = 0.45;

        const footerTl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: startTrigger,
            end: endTrigger,
            scrub: true,
            invalidateOnRefresh: true
          },
          defaults: { duration: tweenDuration, ease: "power2.out" }
        });

        // 1. Top line
        const footerLineDuration = 200;
        const footerContentDuration = 300;
        const footerRighContentDuration = 600;

        const formDelay = 1200;
        const rightContentDelay = 1500;
        footerTl.to('.footer-line-top', { scaleX: 1, ease: "power2.out", duration: footerLineDuration }, 0);
        // 2. h2 "Have a question?"
        footerTl.to('.footer-h2-text', { y: 0 , duration: 250}, 350);
        // 3. Form — messages and inputs one after another
        footerTl.to('.footer-form-message-0', { x: 0, opacity: 1, duration: footerContentDuration },formDelay);
        footerTl.to('.footer-form-input-0', { x: 0, opacity: 1, duration: footerContentDuration }, formDelay + 100);
        footerTl.to('.footer-form-message-1', { x: 0, opacity: 1, duration: footerContentDuration }, formDelay + 200);
        footerTl.to('.footer-form-input-1', { x: 0, opacity: 1, duration: footerContentDuration }, formDelay + 300);
        footerTl.to('.footer-form-message-2', { x: 0, opacity: 1, duration: footerContentDuration }, formDelay + 400);
        footerTl.to('.footer-form-input-2', { x: 0, opacity: 1, duration: footerContentDuration }, formDelay + 500);
        // 4. Contact block — one after another
        footerTl.to('.footer-call-us-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay);
        footerTl.to('.footer-phone-number', { y: 0 , duration : footerRighContentDuration }, rightContentDelay + 100);
        footerTl.to('.footer-visit-us-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 200);
        footerTl.to('.footer-tbilisi-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 300);
        footerTl.to('.footer-address-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 400);
        footerTl.to('.footer-connect-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 500);
        footerTl.to('.footer-email-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 600);
        footerTl.to('.footer-home-text', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 700);
        footerTl.to('.footer-link-we-are', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 800);
        footerTl.to('.footer-link-service', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 900);
        footerTl.to('.footer-link-blog', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 1000);
        footerTl.to('.footer-link-contact', { y: 0 , duration: footerRighContentDuration }, rightContentDelay + 1100);

        // s
        // Copyright — separate timeline so its delay/duration does not affect main content speed
        const copyrightDuration = 1.2;
        const copyrightTl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "bottom bottom",
            scrub: true,
            invalidateOnRefresh: true
          },
          defaults: { duration: copyrightDuration, ease: "power2.out" }
        });
        copyrightTl.to('.copyright-up-line', { scaleX: 1 }, 0);
        copyrightTl.to('.copyright-text', { y: 0 }, staggerAmount);
        copyrightTl.to('.copyright-down-line', { scaleX: 1 }, staggerAmount * 2);
    };

    // Large Desktop (>1700px)
    mm.add("(min-width: 1701px)", () => {
        createFooterAnimation("top 90%", "top 60%", 0.08);
    });

    // Laptop (1280px - 1700px)
    mm.add("(min-width: 1025px) and (max-width: 1700px)", () => {
        createFooterAnimation("top 85%", "top 55%", 0.08);
    });

    // Tablet (768px - 1023px)
    mm.add("(min-width: 768px) and (max-width: 1024px)", () => {
        createFooterAnimation("top 85%", "top 65%", 0.08);
    });

    // Mobile (<767px)
    mm.add("(max-width: 767px)", () => {
        createFooterAnimation("top 80%", "top 40%", 0.05);
    });

    return () => {
        mm.revert();
    };
  }, { scope: footerRef });

  return (
    <footer ref={footerRef} id="footer" className="footer w-full  text-sm text-gray-500 relative">
      <div className='footer-line-top footer-line w-[95%] bg-[#FFFFFF33] h-[1px] absolute top-0 left-1/2 -translate-x-1/2'></div>
      <div className='footer-content w-full h-[50%] flex gap-[85px] mt-[35px]'>
        <div className='question-section w-[40%]  '>
          <h2>
            <div className="overflow-hidden">
              <span className="footer-h2-text block">{t.footer.question}</span>
            </div>
          </h2>
          <div className='w-[80%] pt-[53px]  '>
            <Form inputFields={inputFields}  />
          </div>

        </div>
        <div className='contact-section pt-[73px] gap-[20px] flex justify-evenly'>
          <div className='contact-container flex flex-col gap-[53px]  '>
            <div className='flex flex-col gap-[18px] '>
              <h3 className='text-[18px]'>
                <div className="overflow-hidden">
                  <span className="footer-call-us-text block">{t.footer.callUs}</span>
                </div>
              </h3>
              <div>
                <div className="overflow-hidden">
                  <span className="footer-phone-number block">+995 595 893 399</span>
                </div>
              </div>
            </div>
            <div className='flex flex-col   '>
              <h3 className='text-[18px]'>
                <div className="overflow-hidden">
                  <span className="footer-visit-us-text block">{t.footer.visitUs}</span>
                </div>
              </h3>
              <div className='pt-[18px] '>
                <div className="overflow-hidden">
                  <span className="footer-tbilisi-text block">{t.footer.address.city}</span>
                </div>
              </div>
              <div>
                <div className="overflow-hidden">
                  <span className="footer-address-text block">{t.footer.address.street}</span>
                </div>
              </div>
            </div>
            
          </div>
          <div className='connect-container flex flex-col gap-[16px] '>
            <h3 className='text-[18px]'>
              <div className="overflow-hidden">
                <span className="footer-connect-text block">{t.footer.connect}</span>
              </div>
            </h3>
            <div>
              <div className="overflow-hidden">
                <span className="footer-email-text block">gamarjoba@focusagency.ge</span>
              </div>
            </div>
          </div>
          <div className='home-container pl-[80px] flex flex-col gap-[18px] '>
            <h3 className='text-[18px]'>
              <div className="overflow-hidden">
                <span className="footer-home-text block">{t.footer.home}</span>
              </div>
            </h3>
            <div>
              <div className="overflow-hidden">
                <span className="footer-link-we-are block">{t.footer.nav.weAre}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <span className="footer-link-service block">{t.footer.nav.service}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <span className="footer-link-blog block">{t.footer.nav.blog}</span>
              </div>
            </div>
            <div>
              <div className="overflow-hidden">
                <span className="footer-link-contact block">{t.footer.nav.contact}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className='copyright-section footer-line w-[95%] pb-[20px] bg-[black] absolute top-0 left-1/2 -translate-x-1/2 mt-[60px] h-[100px] w-full flex flex-col justify-center items-center'>
          <div className='copyright-up-line w-[95%] bg-[#FFFFFF33] h-[1px] '></div>
            <div className=" p-[5px] text-[white] text-center">
              <div className="overflow-hidden inline-block">
                <span className="copyright-text block">{t.footer.copyright}</span>
              </div>
            </div>
          <div className='copyright-down-line w-[95%] bg-[#FFFFFF33] h-[1px]'></div>
      </div>
      
    </footer>
  );
};
