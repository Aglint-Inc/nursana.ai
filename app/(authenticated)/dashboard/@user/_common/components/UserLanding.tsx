import { FileText, MessageSquare } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

import { useUserData } from '@/authenicated/hooks/useUserData';
import { Button } from '@/components/ui/button';

import RadialProgress from './RadialProgress';

function UserLanding() {
  const userData = useUserData();
  const analysis = userData?.analysis?.structured_analysis;

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  const chartData = [
    {
      name: 'Score',
      value: analysis.overall_score,
      fill: '#8b5cf6',
    },
  ];

  return (
    <div className='flex h-[90vh] flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2 text-center text-3xl font-medium'>
          <div className='text-purple-700'>
            {' '}
            Hello {userData?.user?.first_name || 'Nurse'},
          </div>
          <div>Welcome to Nursana 💜</div>
        </div>
        <p className='text-center text-muted-foreground'>
          {' '}
          Keep your profile up to date, collect valuable feedback on your resume
          and interview responses, and stay tuned for the perfect job
          opportunity coming your way.
        </p>
      </div>

      <div className='grid w-full grid-cols-3 gap-4'>
        <div className='flex flex-col items-center gap-2 rounded-lg bg-muted p-4'>
          <div className='mb-[-32px] mt-[10px]'>Interview Score</div>
          <RadialProgress chartData={chartData} size={250} />
          <Button className='w-full'>View Detail</Button>
        </div>
        <div className='flex flex-col items-center gap-2 rounded-lg bg-muted p-4'>
          <div className='mb-[-32px] mt-[10px]'>Resume Score</div>
          <RadialProgress chartData={chartData} size={250} />
          <Button className='w-full'>View Detail</Button>
        </div>
        <div className='grid grid-cols-1 grid-rows-2 gap-4'>
          <div className='flex flex-col gap-2 rounded-lg bg-muted p-4 justify-between'>
            <div className='flex flex-col gap-1'>
            <FileText className='w-8 h-8 text-purple-600' strokeWidth={1.5}/>
            <span>my-resume-nurse.pdf</span>
            </div>
            <Link href='/profile' className='flex items-center gap-2 text-sm text-blue-600'>
            <span>Edit Resume Details</span>
           
            </Link>
          </div>
          <div className='flex flex-col gap-2 rounded-lg bg-muted p-4 justify-between'>
          <div className='flex flex-col gap-1'>
            <MessageSquare className='w-8 h-8 text-purple-600' strokeWidth={1.5}/>
            <span className='text-sm'>Interview completed on Monday 17 Oct 2024</span>
            </div>
            <Link href='/profile' className='flex items-center gap-2 text-sm text-blue-600'>
            <span>Replay Interview</span>
    
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLanding;
