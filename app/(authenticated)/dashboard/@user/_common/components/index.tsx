'use client';
import Section from '@/components/section';

import LeftSection from './LeftSection';
// import RightSection from './RightSection';

function UserDashboard() {
  return (
    <Section>
        <div className='container max-w-3xl mx-auto w-full'>
          <LeftSection />
        </div>
        {/* <div className='flex w-[350px] flex-col'>
          <RightSection />
        </div> */}
    
    </Section>
  );
}

export default UserDashboard;
