import { FileCheck, FileX, TvMinimalPlay } from 'lucide-react';
import { type PropsWithChildren } from 'react';

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
    <div className='flex flex-col justify-between gap-2 rounded-lg bg-muted p-5'>
      {props.submitted ? <ResumeSubmitted /> : <ResumeNotSubmitted />}
      {props.children}
    </div>
  );
};

type InterviewProps = {
  variant: Extract<Variant, 'interview'>;
  completed: boolean;
  completedAt?: string;
};

const Interview = (props: PropsWithChildren<InterviewProps>) => {
  return (
    <div className='flex h-full flex-col justify-between rounded-lg bg-muted p-5'>
      <TvMinimalPlay
        className='h-8 w-8 text-muted-foreground'
        strokeWidth={1.5}
      />
      <div className='flex flex-col gap-0.5'>
        {props.completed ? (
          <InterviewCompleted {...props} />
        ) : (
          <InterviewIncomplete />
        )}
      </div>
      {props.children}
    </div>
  );
};

const ResumeSubmitted = () => {
  return (
    <div className='flex flex-col gap-2'>
      <FileCheck className='h-8 w-8 text-muted-foreground' strokeWidth={1.5} />
      <div className='flex flex-col gap-1'>
        <span>Resume submitted</span>
      </div>
    </div>
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

const InterviewCompleted = (props: InterviewProps) => {
  if (!props.completedAt) return <></>;
  return (
    <>
      <span className='text-sm text-muted-foreground'>
        Interview completed on
      </span>
      <span className='text-sm'>
        {new Date(props.completedAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </span>
    </>
  );
};

const InterviewIncomplete = () => {
  return (
    <span className='text-sm text-muted-foreground'>
      You have an interview scheduled
    </span>
  );
};
