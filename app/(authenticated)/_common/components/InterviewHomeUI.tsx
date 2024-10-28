import { Button } from '@/components/ui/button';
import RadialProgress from '@/dashboard/components/RadialProgress';
import { Database } from '@/supabase-types/database.types';
import { FileCheck, TvMinimalPlay } from 'lucide-react';
import Link from 'next/link';

export const InterviewHomeUI = ({
  first_name,
  interview,
  InterviewScore,
  ResumeScore,
}: UserLandingProps) => {
  const { id, stage, updated_at } = interview;
  return (
    <div className='flex h-[85vh] flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2 text-center text-3xl font-medium'>
          <div className='text-purple-700'>
            {' '}
            Hello {first_name || 'Nurse'} 👋,
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
      {stage !== 'interview_completed' && (
        <div className='flex w-full items-center justify-between rounded-md border border-yellow-500 p-4 text-center'>
          <p className='font-bold text-yellow-500'>
            You have not completed your interview yet.
          </p>
          <Link
            className='text-blue-600'
            href={`/interview/${id}/start-interview`}
          >
            Start Now
          </Link>
        </div>
      )}
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
              <TvMinimalPlay
                className='h-8 w-8 text-muted-foreground'
                strokeWidth={1.5}
              />
              <div className='flex flex-col gap-0.5'>
                <span className='text-sm text-muted-foreground'>
                  {stage === 'interview_completed'
                    ? 'Interview completed on,'
                    : 'You have an interview scheduled'}
                </span>
                {stage === 'interview_completed' && (
                  <span className='text-sm'>
                    {updated_at
                      ? new Date(updated_at).toLocaleDateString('en-US', {
                          weekday: 'long',
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })
                      : 'Date not available'}
                  </span>
                )}
              </div>
            </div>
            {stage === 'interview_completed' ? (
              <Link
                href='/interview-transcript'
                className='flex items-center gap-2 text-sm text-blue-600'
              >
                <span>Replay Interview</span>
              </Link>
            ) : (
              <Link
                href={`/interview/${id}/start-interview`}
                className='flex items-center gap-2 text-sm text-blue-600'
              >
                <span className='cursor-pointer'>Start now</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export type UserLandingProps = {
  first_name: string | undefined;
  interview: {
    id: string;
    stage: Database['public']['Enums']['interview_stage'] | '';
    updated_at: string;
  };
  InterviewScore: ScoreType[];
  ResumeScore: ScoreType[];
};
type ScoreType = {
  name: string;
  value: any;
  fill: string;
  path: string;
};
