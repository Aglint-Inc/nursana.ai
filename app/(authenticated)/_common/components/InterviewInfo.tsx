import { FileCheck, FileX, TvMinimalPlay } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import { type Database } from '@/supabase-types/database.types';

type Variant = 'resume' | 'interview';

type Props = ResumeProps | InterviewProps;

export const InterviewInfo = (props: PropsWithChildren<Props>) => {
  switch (props.variant) {
    case 'resume':
      return <Resume {...props} />;
    case 'interview':
      return <Interview {...props} />;
  }
};

type ResumeProps = {
  variant: Extract<Variant, 'resume'>;
  submitted: boolean;
};

const Resume = (props: PropsWithChildren<ResumeProps>) => {
  return (
    <div className='flex h-full flex-col justify-evenly rounded-lg bg-muted p-5'>
      {props.submitted ? <ResumeSubmitted /> : <ResumeNotSubmitted />}
      {props.children}
    </div>
  );
};

type InterviewProps = {
  variant: Extract<Variant, 'interview'>;
} & Pick<
  Database['public']['Tables']['interview']['Row'],
  'id' | 'interview_stage' | 'updated_at'
>;

const Interview = (props: PropsWithChildren<InterviewProps>) => {
  return (
    <div className='flex h-full flex-col justify-evenly rounded-lg bg-muted p-5'>
      <TvMinimalPlay
        className='h-8 w-8 text-muted-foreground'
        strokeWidth={1.5}
      />
      <div className='flex flex-col gap-0.5'>
        <InterviewStage {...props} />
      </div>
      {props.children}
    </div>
  );
};

const ResumeSubmitted = () => {
  return (
    <>
      <FileCheck className='h-8 w-8 text-muted-foreground' strokeWidth={1.5} />
      <div className='flex flex-col gap-1'>
        <span>Resume submitted</span>
      </div>
    </>
  );
};

const ResumeNotSubmitted = () => {
  return (
    <div className='flex flex-col gap-2'>
      <FileX className='h-8 w-8 text-muted-foreground' strokeWidth={1.5} />
      <div className='flex flex-col gap-1'>
        <span>Resume not submitted</span>
      </div>
    </div>
  );
};

const InterviewStage = (props: InterviewProps) => {
  switch (props.interview_stage) {
    case 'not_started':
    case 'resume_submitted':
      return <InterviewIncomplete />;
    case 'interview_inprogress':
      return <InterviewInprogress />;
    case 'interview_completed':
      return <InterviewCompleted {...props} />;
  }
};

const InterviewCompleted = (props: InterviewProps) => {
  if (!props.updated_at) return <></>;
  return (
    <>
      <span className='text-sm text-muted-foreground'>
        Interview completed on
      </span>
      <span className='text-sm'>
        {new Date(props.updated_at).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </>
  );
};

const InterviewInprogress = () => {
  return (
    <span className='text-sm text-muted-foreground'>
      An interview is in progress
    </span>
  );
};

const InterviewIncomplete = () => {
  return (
    <span className='text-sm text-muted-foreground'>
      An interview has been scheduled
    </span>
  );
};
