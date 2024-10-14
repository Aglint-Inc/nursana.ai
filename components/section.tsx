import React, { FC, ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
}

const Section: FC<SectionProps> = ({ children }) => {
  return (
    <div className="w-full">
      <div className="px-6">
        <div className="container">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Section;
