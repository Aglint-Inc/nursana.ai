'use client';
import { FileCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

import { useUserData } from '@/applicant/hooks/useUserData';
import { Button } from '@/components/ui/button';

import RadialProgress from './RadialProgress';

function UserLanding() {
  const { user, resume, analysis, interview } = useUserData();
  const { overallScore } = resume?.resume_feedback || {};

  if (!analysis) {
    return <div>No analysis available.</div>;
  }

  const InterviewScore = [
    {
      name: 'Score',
      value: analysis.structured_analysis.overall_score,
      fill: '#8b5cf6',
      path: '#ddd6fe',
    },
  ];

  const ResumeScore = [
    {
      name: 'Score',
      value: overallScore,
      fill: '#db2777',
      path: '#fbcfe8',
    },
  ];

  return (
    <div className='flex h-[85vh] flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2 text-center text-3xl font-medium'>
          <div className='text-purple-700'>
            {' '}
            Hello {user?.first_name || 'Nurse'} 👋,
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
        <div className='flex flex-col items-center gap-2 rounded-lg bg-purple-50 p-4'>
          <div className='mb-[-32px] mt-[10px] font-medium text-purple-600'>
            Interview Score
          </div>
          <RadialProgress chartData={InterviewScore} size={250} />
          <Link href={'/interview-feedback'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </div>
        <div className='flex flex-col items-center gap-2 rounded-lg bg-pink-50 p-4'>
          <div className='mb-[-32px] mt-[10px] font-medium text-pink-600'>
            Resume Score
          </div>
          <RadialProgress chartData={ResumeScore} size={250} />
          <Link href={'/resume-review'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </div>
        <div className='grid grid-cols-1 grid-rows-2 gap-4'>
          <div className='flex flex-col justify-between gap-2 rounded-lg bg-muted p-5'>
            <div className='flex flex-col gap-2'>
              <FileCheck
                className='h-8 w-8 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='flex flex-col gap-1'>
                <span>Resume Submitted</span>
                {/* <span>
                  {resume?.created_at
                    ? new Date(resume.created_at).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })
                    : 'Date not available'}
                </span> */}
              </div>
            </div>
            <Link
              href='/profile/basic-information'
              className='flex items-center gap-2 text-sm text-blue-600'
            >
              <span>Edit Basic Information</span>
            </Link>
          </div>
          <div className='flex flex-col justify-between gap-2 rounded-lg bg-muted p-5'>
            <div className='flex flex-col gap-2'>
              <MessageSquare
                className='h-8 w-8 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='flex flex-col gap-0.5'>
                <span className='text-sm text-muted-foreground'>
                  Interview completed on,
                </span>
                <span className='text-sm'>
                  {interview?.updated_at
                    ? new Date(interview?.updated_at).toLocaleDateString(
                        'en-US',
                        {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        },
                      )
                    : 'Date not available'}
                </span>
              </div>
            </div>
            <Link
              href='/interview-transcript'
              className='flex items-center gap-2 text-sm text-blue-600'
            >
              <span>Replay Interview</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserLanding;
