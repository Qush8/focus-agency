'use client';
import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Form from '../ui/Form';

gsap.registerPlugin(ScrollTrigger);

export const Footer = () => {
  const [value, setValue] = useState({
    name: '',
    email: '',
    message: '',
  });

  const footerRef = useRef<HTMLElement>(null);
  const footerLineRef = useRef<HTMLDivElement>(null);
  const questionSectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const contactSectionRef = useRef<HTMLDivElement>(null);
  const copyrightRef = useRef<HTMLDivElement>(null);

  const inputFields = [
    {
        icon: '/icons/arrow.svg',
        type: 'text',
        value: value.name,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, name: e.target.value }),
        placeholder: 'Name',
        message: 'PLEASE ENTER YOUR FULL NAME',
        name: 'full_name',
    },
    {
        icon: '/icons/arrow.svg',
        type: 'email',
        value: value.email,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, email: e.target.value }),
        placeholder: '@Email',
        message: 'PLEASE ENTER YOUR EMAIL ADDRESS',
        name: 'email',
    },
    {
        icon: '/icons/face.svg',
        type: 'text',
        value: value.message,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => setValue({ ...value, message: e.target.value }),
        placeholder: 'Message',
        message: 'SHOOT A MESSAGE',
        name: 'message',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(footerLineRef.current, {
        scaleX: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(questionSectionRef.current, {
        opacity: 0,
        x: -50,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(formRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(contactSectionRef.current?.children || [], {
        opacity: 0,
        x: 50,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 80%",
          toggleActions: "play none none none"
        }
      });

      gsap.from(copyrightRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 60%",
          toggleActions: "play none none none"
        }
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="footer w-full  text-sm text-gray-500 relative">
      <div ref={footerLineRef} className='footer-line w-[91%] bg-[white] h-[1px] absolute top-0 left-1/2 -translate-x-1/2'></div>
      <div className='footer-content w-full h-[50%] flex gap-[85px] mt-[35px]'>
        <div ref={questionSectionRef} className='question-section w-[40%]  '>
          <h2> Have a question?</h2>
          <div ref={formRef} className='w-[80%] pt-[53px]  '>
            <Form inputFields={inputFields}  />
          </div>

        </div>
        <div ref={contactSectionRef} className='contact-section pt-[73px] gap-[20px] flex justify-evenly'>
          <div className='contact-container flex flex-col gap-[53px]  '>
            <div className='flex flex-col gap-[18px] '>
              <h3 className='text-[18px]'>
                <div>Call us anytime</div>
              </h3>
              <div>
                  <p>+995 595 893 399</p>
              </div>
            </div>
            <div className='flex flex-col   '>
              <h3 className='text-[18px]'>
                <div>You're welcome to visit us</div>
              </h3>
              <div className='pt-[18px] '>
                <p>Tbilisi, Saburtalo</p>
              </div>
              <div>
                <p>Alexandre Kazbegi st N24</p>
              </div>
            </div>
            
          </div>
          <div className='connect-container flex flex-col gap-[16px] '>
            <h3 className='text-[18px]'>Connect with us by email</h3>
            <div>
              <p>gamarjoba@focusagency.ge</p>
            </div>
          </div>
          <div className='home-container pl-[80px] flex flex-col gap-[18px] '>
            <h3 className='text-[18px]'>
              <div>Home</div>
              </h3>
            <div>
              <p>We are</p>
            </div>
            <div>
              <p>Service</p>
            </div>
            <div>
              <p>Blog</p>
            </div>
            <div>
              <p>Contact</p>
            </div>
          </div>
        </div>
      </div>
      
      <div ref={copyrightRef} className='copyright-section footer-line w-[95%] pb-[20px] bg-[black] absolute top-0 left-1/2 -translate-x-1/2 mt-[60px] h-[100px] w-full flex flex-col justify-center items-center'>
          <div className='copyright-up-line w-[91%] bg-[white] h-[1px] '></div>
            <p className=" p-[5px] text-[white] text-center">2026 created by Systemctl</p>
          <div className='copyright-down-line w-[91%] bg-[white] h-[1px]'></div>
      </div>
      
    </footer>
  );
};
