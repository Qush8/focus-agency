import React from 'react';

export const Footer = () => {
  return (
    <footer className="footer w-full  text-sm text-gray-500 relative">
      <div className='footer-line w-[95%] bg-[white] h-[1px] absolute top-0 left-1/2 -translate-x-1/2'></div>
      <div className='footer-content w-full flex justify-between '>
        <div className='question-section w-[40%]  border border-[white]'>
          <h2> Have a question?</h2>
          <div className='w-[80%] h-[300px] border border-[white] '>
            
          </div>
        </div>
        <div className='contact-section w-[60%]  border border-[white] flex justify-evenly'>
          <div className='contact-container w-[20%] border border-[white]'>
            <div className=''>
              <h3>
                <div>Call us anytime</div>
              </h3>
              <div>
                  <p>+995 595 893 399</p>
              </div>
            </div>
            <div>
              <h3>
                <div>You're welcome to visit us</div>
              </h3>
              <div>
                <p>Tbilisi, Saburtalo</p>
              </div>
              <div>
                <p>Alexandre Kazbegi st N24</p>
              </div>
            </div>
            
          </div>
          <div className='connect-container w-[20%] border border-[white]'>
            <h3>Connect with us by email</h3>
            <div>
              <p>gamarjoba@focusagency.ge</p>
            </div>
          </div>
          <div className='home-container w-[20%] border border-[white]'>
            <h3>Home</h3>
            <div>
              <p>About</p>
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
      <p className="mt-[30px] text-[white]">&copy; {new Date().getFullYear()} Brand. All rights reserved.</p>
      
    </footer>
  );
};
