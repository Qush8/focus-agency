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
        icon: '/icons/face.svg',
        type: 'text',
        value: value.message,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, message: e.target.value }),
        placeholder: t.footer.form.messagePlaceholder,
        message: t.footer.form.messageError,
        name: 'message',
    },
]

  useGSAP(() => {
    // Set initial hidden states
    gsap.set('.footer-line-top', { scaleX: 0, transformOrigin: 'center' });
    gsap.set('.footer-h2-text', { y: "100%" });
    gsap.set('.footer-form-message-0, .footer-form-message-1, .footer-form-message-2', { x: -100, opacity: 0 });
    gsap.set('.footer-form-input-0, .footer-form-input-1, .footer-form-input-2', { x: -100, opacity: 0 });
    gsap.set('.footer-call-us-text, .footer-phone-number, .footer-visit-us-text, .footer-tbilisi-text, .footer-address-text, .footer-connect-text, .footer-email-text, .footer-home-text, .footer-link-we-are, .footer-link-service, .footer-link-blog, .footer-link-contact', { y: "100%" });
    gsap.set('.copyright-up-line, .copyright-down-line', { scaleX: 0, transformOrigin: 'center' });
    gsap.set('.copyright-text', { y: "100%" });

    // Detect mobile/tablet viewport once on mount (content plays when footer top enters viewport)
    const isMobileOrTablet =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(max-width: 1024px)').matches;

    // Second Timeline: Remaining content
    // Desktop (>1024px): იწყება როცა footer-ის bottom შეეხება viewport-ის bottom-ს
    // Mobile/Tablet (≤1024px): footer-ის top viewport-ის 85%-ში შესვლისას (უფრო გვიან)
    const autoPlayTl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: isMobileOrTablet ? 'top 82%' : 'bottom bottom',
        toggleActions: "play reverse play reverse",
        invalidateOnRefresh: true
      },
      defaults: { duration: 0.6, ease: "power2.out" }
    });

    // First Timeline: Top line and h2 - scrubs with scroll, but waits for autoPlayTl to reverse before reversing
    const scrubTl = gsap.timeline({
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 90%",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
        onLeaveBack: () => {
          // If autoPlayTl has content visible (progress > 0), reverse it first
          if (autoPlayTl.progress() > 0) {
            // Temporarily disable scrub to prevent immediate reverse
            const scrubTrigger = scrubTl.scrollTrigger;
            if (scrubTrigger) {
              scrubTrigger.disable();
            }
            // Reverse autoPlayTl first
            autoPlayTl.reverse();
            // After autoPlayTl finishes reversing, re-enable scrubTl
            autoPlayTl.eventCallback("onReverseComplete", () => {
              if (scrubTrigger) {
                scrubTrigger.enable();
                scrubTrigger.refresh();
              }
            });
          }
        }
      },
      defaults: { ease: "none" }
    });

    // Top line
    scrubTl.to('.footer-line-top', { scaleX: 1 }, 0);
    // Left h2 - mask animation
    scrubTl.to('.footer-h2-text', { y: 0 }, 0.1);

    // Form message[0]
    autoPlayTl.to('.footer-form-message-0', { x: 0, opacity: 1 }, 0);
    // Form input[0]
    autoPlayTl.to('.footer-form-input-0', { x: 0, opacity: 1 }, 0.1);

    // Form message[1]
    autoPlayTl.to('.footer-form-message-1', { x: 0, opacity: 1 }, 0.2);
    // Form input[1]
    autoPlayTl.to('.footer-form-input-1', { x: 0, opacity: 1 }, 0.3);

    // Form message[2]
    autoPlayTl.to('.footer-form-message-2', { x: 0, opacity: 1 }, 0.4);
    // Form input[2]
    autoPlayTl.to('.footer-form-input-2', { x: 0, opacity: 1 }, 0.5);

    // Right side "Call us anytime"
    autoPlayTl.to('.footer-call-us-text', { y: 0 }, 0.6);
    // Phone number
    autoPlayTl.to('.footer-phone-number', { y: 0 }, 0.7);
    // "You're welcome to visit us"
    autoPlayTl.to('.footer-visit-us-text', { y: 0 }, 0.8);
    // "Tbilisi, Saburtalo"
    autoPlayTl.to('.footer-tbilisi-text', { y: 0 }, 0.9);
    // "Alexandre Kazbegi st N24"
    autoPlayTl.to('.footer-address-text', { y: 0 }, 1.0);
    // "Connect with us by email"
    autoPlayTl.to('.footer-connect-text', { y: 0 }, 1.1);
    // Email
    autoPlayTl.to('.footer-email-text', { y: 0 }, 1.2);
    // "Home"
    autoPlayTl.to('.footer-home-text', { y: 0 }, 1.3);
    // "We are"
    autoPlayTl.to('.footer-link-we-are', { y: 0 }, 1.4);
    // "Service"
    autoPlayTl.to('.footer-link-service', { y: 0 }, 1.5);
    // "Blog"
    autoPlayTl.to('.footer-link-blog', { y: 0 }, 1.6);
    // "Contact"
    autoPlayTl.to('.footer-link-contact', { y: 0 }, 1.7);

    // Copyright up line
    autoPlayTl.to('.copyright-up-line', { scaleX: 1 }, 1.8);
    // Copyright text
    autoPlayTl.to('.copyright-text', { y: 0 }, 1.9);
    // Copyright down line
    autoPlayTl.to('.copyright-down-line', { scaleX: 1 }, 2.0);

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
