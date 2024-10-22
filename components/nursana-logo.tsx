import React from 'react';

type Variant = 'sm' | 'md' | 'lg';

interface NursanaLogoProps {
  variant?: Variant;
  inverted?: boolean;
}

const NursanaLogo: React.FC<NursanaLogoProps> = ({ variant = 'sm', inverted = false }) => {
  const sizeClass: Record<Variant, string> = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  const textColor = inverted ? 'text-white' : 'text-black';
  const aiColor = inverted ? 'text-white' : 'text-purple-500';

  return (
    <div className={`font-light ${sizeClass[variant]} ${textColor}`}>
      <span className="font-medium">Nursana</span>
      <span className={`font-light ${aiColor}`}>.ai</span>
    </div>
  );
};

export default NursanaLogo;