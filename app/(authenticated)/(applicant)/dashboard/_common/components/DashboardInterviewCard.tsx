import React from 'react';

import { Button } from '@/components/ui/button';

import RadialProgress from './RadialProgress';
import { FileCheck, TvMinimalPlay } from 'lucide-react';
import { Loader } from '@/common/components/Loader';

type ResumeCardProps = {
  status: 'start' | 'completed' | 'analysing';
  interviewScore?: {
    name: string;
    value: number;
    fill: string;
    path?: string;
  }[];
};

function InterviewCard({ status, interviewScore = [] }: ResumeCardProps) {
  return (
    <>
      {status === 'start' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full flex-col justify-between gap-4 min-h-[230px]'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-purple-50'>
                  <TvMinimalPlay
                    className='h-8 w-8 text-purple-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>Take Your Interview Now.</p>
                <p className='text-muted-foreground'>
                  Please start the interview to receive feedback and a score,
                  which will help you match with the perfect job.{' '}
                </p>
              </div>
              <Button>Start Interrview</Button>
            </div>
          </div>
        </div>
      )}
      {status === 'completed' && (
        <div className='w-full rounded-lg border border-border p-6 flex flex-col gap-8 min-h-[230px] justify-between'>
          <div className='grid grid-cols-2'>
            <div className='flex h-full flex-col justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-green-100'>
                  <TvMinimalPlay
                    className='h-8 w-8 text-green-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>Interview Completed</p>
              </div>
           
            </div>

            {interviewScore && (
                <div className='relative'>
                    <div className='absolute top-[-40px] left-[-10px]'>
              <RadialProgress chartData={interviewScore} size={200} />
              </div>
              </div>
            )}
          </div>
          <Button>View Detail</Button>
        </div>
      )}
      {status === 'analysing' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full flex-col justify-between gap-4 min-h-[230px]'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50'>
                  <Loader size={20} className='text-blue-600' />
                </div>
                <p className='text-lg font-medium'>Analysing Interview..</p>
                <p className='text-muted-foreground'>
                  We are analyzing your interview now. Please check back shortly
                  to view your interview score and feedback.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default InterviewCard;
