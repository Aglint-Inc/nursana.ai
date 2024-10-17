import React from 'react';

type Variant = 'sm' | 'md' | 'lg';

interface NursanaLogoProps {
  variant?: Variant;
}

const NursanaLogo: React.FC<NursanaLogoProps> = ({ variant = 'sm' }) => {
  const sizeClass: Record<Variant, string> = {
    sm: 'text-xl',
    md: 'text-2xl',
    lg: 'text-3xl',
  };

  return (
    <div className={`font-light ${sizeClass[variant]}`}>
      <span className="font-medium">Nursana</span>
      <span className="font-light text-purple-500">.ai</span>
    </div>
  );
};

export default NursanaLogo;