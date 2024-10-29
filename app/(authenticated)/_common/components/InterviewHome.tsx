import Link from 'next/link';
import { type ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { type Database } from '@/supabase-types/database.types';

import { InterviewInfo } from './InterviewInfo';
import { ScoreCard } from './ScoreCard';

const Banner = ({ stage, id }: Pick<InterviewProps, 'id' | 'stage'>) => {
  if (stage === 'interview_completed') return null;
  return (
    <div className='flex w-full items-center justify-between rounded-md border border-yellow-500 p-4'>
      <p className='font-bold text-yellow-500'>
        You have not completed your interview yet.
      </p>
      <Link className='text-blue-600' href={`/interview/${id}/start-interview`}>
        Start Now
      </Link>
    </div>
  );
};

type InterviewScoreProps = {
  score: number;
};

const InterviewScore = ({ score }: InterviewScoreProps) => {
  return (
    <ScoreCard score={score} title='Interview Score' variant='purple'>
      <Link href={'/interview-feedback'} className='w-full'>
        <Button className='w-full'>View Detail</Button>
      </Link>
    </ScoreCard>
  );
};

type ResumeScoreProps = {
  score: number;
};

const ResumeScore = ({ score }: ResumeScoreProps) => {
  return (
    <ScoreCard score={score} title='Resume Score'>
      <Link href={'/resume-review'} className='w-full'>
        <Button className='w-full'>View Detail</Button>
      </Link>
    </ScoreCard>
  );
};

const Resume = () => {
  return (
    <InterviewInfo variant='resume' submitted>
      <Link
        href='/profile/basic-information'
        className='flex items-center gap-2 text-sm text-blue-600'
      >
        Edit Basic Information
      </Link>
    </InterviewInfo>
  );
};

type InterviewProps = {
  id: string;
  stage: Database['public']['Enums']['interview_stage'] | '';
  updated_at: string;
};

const Interview = ({ id, stage, updated_at }: InterviewProps) => {
  return (
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
          {stage === 'interview_completed' ? 'Replay interview' : `Start now`}
        </span>
      </Link>
    </InterviewInfo>
  );
};

type TitleProps = {
  first_name: string;
};

const Title = ({ first_name }: TitleProps) => {
  return (
    <div className='flex items-center gap-2 text-center text-3xl font-medium'>
      <div className='text-purple-700'>Hello {first_name || 'Nurse'} 👋,</div>
      <div>Welcome to Nursana 💜</div>
    </div>
  );
};

const Description = () => {
  return (
    <p className='text-center text-muted-foreground'>
      Keep your profile up to date, collect valuable feedback on your resume and
      interview responses, and stay tuned for the perfect job opportunity coming
      your way.
    </p>
  );
};

export const InterviewHome = (props: Props) => {
  return (
    <div className='flex h-[85vh] flex-col items-center justify-center gap-10'>
      <div className='flex flex-col items-center gap-2'>
        {props.Title}
        <Description />
      </div>
      {props.Banner}
      <div className='grid w-full grid-cols-3 gap-4'>
        {props.InterviewScore}
        {props.ResumeScore}
        <div className='flex flex-col gap-4'>
          {props.ResumeInfo}
          {props.InterviewInfo}
        </div>
      </div>
    </div>
  );
};
InterviewHome.Title = Title;
InterviewHome.Banner = Banner;
InterviewHome.InterviewScore = InterviewScore;
InterviewHome.ResumeScore = ResumeScore;
InterviewHome.ResumeInfo = Resume;
InterviewHome.InterviewInfo = Interview;

export type Props = {
  Title?: ReactNode;
  Banner?: ReactNode;
  InterviewScore?: ReactNode;
  ResumeScore?: ReactNode;
  ResumeInfo?: ReactNode;
  InterviewInfo?: ReactNode;
};
