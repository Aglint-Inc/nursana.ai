import React, { type FC, type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <div className='w-full'>
      <div className='px-6'>
        <div className='container max-w-screen-xl'>{children}</div>
      </div>
    </div>
  );
};

export default Section;
