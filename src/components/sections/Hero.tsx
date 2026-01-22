import React from 'react';

export const Hero = () => {
  return (
    <section className="section-hero w-full flex flex-col items-start bg-[black] min-h-screen">
      <h2 className="text-[white]">
        Increase your sales
      </h2>
      <h1 className="text-[white]">
        <div>Increase your sales and</div>
        <div>brand awareness with</div>
        <div>the <span className="font-[700]">FocusAgency</span> team</div>
      </h1>
      <div className="mt-8">
        <button className="bg-[white] text-[black] px-6 py-3 rounded-lg font-medium">
          schedule a meeting
        </button>
      </div>
      <div className='icons flex justify-between w-[400px] h-[30px] mt-8'>
        <div className='left-side-icons w-[40%]'></div>
        <div className='right-side-icons w-[40%]'></div>
      </div>
    </section>
  );
};
