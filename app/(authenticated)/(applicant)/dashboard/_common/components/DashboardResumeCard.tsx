import { FileCheck, TriangleAlert } from 'lucide-react';
import React from 'react';

import { Button } from '@/components/ui/button';

import RadialProgress from './RadialProgress';
import { Loader } from '@/common/components/Loader';
import Link from 'next/link';

type ResumeCardProps = {
  status: 'reupload' | 'inProgress' | 'completed';
  resumeScore?: {
    name: string;
    value: number;
    fill: string;
    path?: string;
  }[];
};

function ResumeCard({ status, resumeScore }: ResumeCardProps) {
  return (
    <>
      {status === 'reupload' && (
        <div className='w-full rounded-lg border border-border p-6'>
        <div className='grid grid-cols-1'>
          <div className='flex h-full flex-col justify-between gap-4 min-h-[230px]'>
            <div className='flex flex-col gap-2'>
              <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-red-50'>
              <TriangleAlert
                    className='h-8 w-8 text-red-600'
                    strokeWidth={1.4}
                  />
              </div>
              <p className='text-lg font-medium'>
               Reupload your resume
              </p>
              <p className='text-muted-foreground'>
               Unable to process the uploaded resume. Please try reuploading it again.
              </p>
            </div>
            <Button>Reupload Resume</Button>
            
          </div>
        </div>
      </div>
      )}
      {status === 'inProgress' && (
        <div className='w-full rounded-lg border border-border p-6'>
          <div className='grid grid-cols-1'>
            <div className='flex h-full flex-col justify-between gap-4 min-h-[230px]'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-blue-50'>
                  <Loader size={20} className='text-blue-600'/>
                </div>
                <p className='text-lg font-medium'>
                  Resume analysis in progress{' '}
                </p>
                <p className='text-muted-foreground'>
                  We have received your resume and are currently analyzing it.
                  Please check back in a few minutes to view your resume score
                  and detailed analysis
                </p>
              </div>
              
            </div>
          </div>
        </div>
      )}
      {status === 'completed' && (
        <div className='w-full rounded-lg border border-border p-6 flex flex-col gap-8 min-h-[230px] justify-between'>
          <div className='grid grid-cols-2'>
            <div className='flex h-full flex-col justify-between'>
              <div className='flex flex-col gap-2'>
                <div className='flex h-14 w-14 items-center justify-center rounded-lg bg-green-50'>
                  <FileCheck
                    className='h-8 w-8 text-green-600'
                    strokeWidth={1.4}
                  />
                </div>
                <p className='text-lg font-medium'>Resume Analysis Completed</p>
              </div>
            </div>

            {resumeScore && (
              
              <div className='relative'>
                    <div className='absolute top-[-40px] left-[-10px]'>
                    <RadialProgress chartData={resumeScore} size={200} />
              </div>
              </div>
            )}
          </div>
          <Link href={'/resume-review'} className='w-full'>
          <Button className='w-full'>View Detail</Button>
          </Link>
        </div>
      )}
    </>
  );
}

export default ResumeCard;
