'use client';
import Section from '@/components/section';

import LeftSection from './LeftSection';
import RightSection from './RightSection';

function UserDashboard() {
  return (
    <Section>
      <div className='mb-20 grid w-full grid-cols-[1fr_max-content] gap-4'>
        <div className='flex flex-col'>
          <LeftSection />
        </div>
        <div className='flex w-[350px] flex-col'>
          <RightSection />
        </div>
      </div>
    </Section>
  );
}

export default UserDashboard;
