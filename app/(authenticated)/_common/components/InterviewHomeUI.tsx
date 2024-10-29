import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { type Database } from '@/supabase-types/database.types';

import { InterviewInfo } from './InterviewInfo';
import { ScoreCard } from './ScoreCard';

export const InterviewHomeUI = ({
  first_name,
  interview,
  interviewScore,
  resumeScore,
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
        <ScoreCard
          score={interviewScore}
          title='Interview Score'
          variant='purple'
        >
          <Link href={'/interview-feedback'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </ScoreCard>
        <ScoreCard score={resumeScore} title='Resume Score'>
          <Link href={'/resume-review'} className='w-full'>
            <Button className='w-full'>View Detail</Button>
          </Link>
        </ScoreCard>
        <div className='flex flex-col gap-4'>
          <InterviewInfo variant='resume' submitted>
            <Link
              href='/profile/basic-information'
              className='flex items-center gap-2 text-sm text-blue-600'
            >
              Edit Basic Information
            </Link>
          </InterviewInfo>
          <InterviewInfo
            variant='interview'
            completed={stage === 'interview_completed'}
            completedAt={updated_at}
          >
            <Link
              href={
                stage === 'interview_completed'
                  ? '/interview-transcript'
                  : `/interview/${id}/start-interview`
              }
              className='flex items-center gap-2 text-sm text-blue-600'
            >
              <span>
                {stage === 'interview_completed'
                  ? 'Replay interview'
                  : `Start now`}
              </span>
            </Link>
          </InterviewInfo>
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
  interviewScore: any;
  resumeScore: any;
};
