import { type PropsWithChildren, type ReactNode } from 'react';

import { type Database } from '@/supabase-types/database.types';

import { InterviewInfo } from './InterviewInfo';
import { ScoreCard } from './ScoreCard';

const Banner = ({
  interview_stage,
  children,
}: PropsWithChildren<Pick<InterviewProps, 'interview_stage'>>) => {
  if (interview_stage === 'interview_completed') return null;
  return (
    <div className='flex w-full items-center justify-between rounded-md border border-yellow-500 p-4'>
      <p className='font-bold text-yellow-500'>Interview not completed</p>
      {children}
    </div>
  );
};

type InterviewScoreFallbackProps = {
  message: string;
};

const InterviewScoreFallback = ({ message }: InterviewScoreFallbackProps) => {
  return (
    <ScoreCard title='Interview Score' variant='error'>
      {message}
    </ScoreCard>
  );
};

type InterviewScoreProps = {
  score: number;
};

const InterviewScore = ({
  score,
  children,
}: PropsWithChildren<InterviewScoreProps>) => {
  return (
    <ScoreCard score={score} title='Interview Score' variant='purple'>
      {children}
    </ScoreCard>
  );
};
InterviewScore.Fallback = InterviewScoreFallback;

type ResumeScoreProps = {
  score: number;
};

type ResumeScoreFallbackProps = {
  message: string;
};

const ResumeScoreFallback = ({ message }: ResumeScoreFallbackProps) => {
  return (
    <ScoreCard title='Resume Score' variant='error'>
      {message}
    </ScoreCard>
  );
};

const ResumeScore = ({
  score,
  children,
}: PropsWithChildren<ResumeScoreProps>) => {
  return (
    <ScoreCard score={score} title='Resume Score'>
      {children}
    </ScoreCard>
  );
};
ResumeScore.Fallback = ResumeScoreFallback;

const Resume = ({ children }: PropsWithChildren) => {
  return (
    <InterviewInfo variant='resume' submitted>
      {children}
    </InterviewInfo>
  );
};

type InterviewProps = Pick<
  Database['public']['Tables']['interview']['Row'],
  'id' | 'interview_stage' | 'updated_at'
>;

const Interview = ({
  children,
  ...props
}: PropsWithChildren<InterviewProps>) => {
  return (
    <InterviewInfo variant='interview' {...props}>
      {children}
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
