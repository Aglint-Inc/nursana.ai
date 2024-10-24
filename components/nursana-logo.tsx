import Image from 'next/image';
import React from 'react';

interface NursanaLogoProps {
  width?: number;
  height?: number;
}

const NursanaLogo: React.FC<NursanaLogoProps> = ({ width = 150, height = 60 }) => {
  return (
    <div>
      <Image
        src={'/images/nursana-beta.svg'}
        width={width}
        height={height}
        alt='nursana.ai'
      />
    </div>
  );
};

export default NursanaLogo;