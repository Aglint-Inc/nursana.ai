import Link from 'next/link';
import React from 'react';

import NursanaLogo from './nursana-logo';
import Section from './section';
import { Button } from './ui/button';

const Navbar: React.FC = () => {
  return (
    <Section>
      <nav className='flex h-20 w-full items-center justify-center'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex items-center gap-5 font-semibold'>
            <Link href='/' className='flex items-center justify-center'>
              <NursanaLogo />
            </Link>
          </div>
          <GetStarted />
        </div>
      </nav>
    </Section>
  );
};

export default Navbar;
function GetStarted() {
  return (
    <div className='flex gap-2'>
      <Button asChild variant={'default'}>
        <Link href='/campaign/?campaign_code=SUMMER23NURSE'>Get Started</Link>
      </Button>
    </div>
  );
}
