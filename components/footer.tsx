// import { ThemeSwitcher } from './theme-switcher';
import { Sparkle } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className='mx-auto flex w-full flex-col items-center justify-center gap-2 py-4 text-center text-xs text-muted-foreground'>
      <div className='flex items-center gap-2'>
        <p>Powered by</p>
        <Link href={'https://aglint.ai'} className='flex items-center gap-1'>
          <Sparkle size={16} className='text-orange-500' />
          <p>Aglint AI</p>
        </Link>
      </div>
      <div>© All rights reserved.</div>
      {/* <ThemeSwitcher /> */}
    </footer>
  );
};

export default Footer;
