import React from 'react';

export const Hero = () => {
  return (
    <section className="w-full py-32 px-6 flex flex-col  bg-[black] h-[3840px]">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight text-[white] ">
        <div>
          Increase your sales and
        </div>
        <div>
          brand awareness with
        </div>
        <div>
        the <span className="text-[white]">FocusAgency</span> team
        </div> 
      </h1>
      <div>
        <button>
           schedule a meeting
        </button>
      </div>
     
      <div className='icons flex justify-between border border-[white]  w-[400px] h-[30px]'>
        <div className='left-side-icons w-[40%] border border-[white]'></div>
        <div className='right-side-icons w-[40%] border border-[white]'></div>
      </div>
      
    </section>
  );
};
