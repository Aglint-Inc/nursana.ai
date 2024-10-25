import { FilePenLine, X } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  SheetClose,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useVersion } from '@/version/hooks/useVersion';

import { useDetails } from './Context';

export const View = () => {
  return (
    <>
      <Header />
      <Body />
    </>
  );
};

const Header = () => {
  return (
    <SheetHeader className='translate-y-[-16px]'>
      <Title>
        <div className='flex gap-2'>
          <Settings />
          <SheetClose>
            <Button variant={'secondary'} size={'sm'}>
              <X size={16} /> Close
            </Button>
          </SheetClose>
        </div>
      </Title>
    </SheetHeader>
  );
};

const Title = (props: PropsWithChildren) => {
  const version = useVersion();
  return (
    <SheetTitle className='flex flex-row items-center justify-between gap-2 font-medium capitalize'>
      {version.name}
      {props.children}
    </SheetTitle>
  );
};

const Settings = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'default'} size={'sm'} onClick={() => setMode('edit')}>
      <FilePenLine size={16} /> Edit Template
    </Button>
  );
};

const Body = () => {
  return (
    <SheetDescription>
      <Content />
    </SheetDescription>
  );
};
type DetailType = {
  label: string;
  value: string | number | null | string[];
  textArea?: boolean;
};

const Content = () => {
  const version = useVersion();

  // eslint-disable-next-line no-unused-vars
  const AiDetails: DetailType[] = [
    {
      label: 'Interview Duration',
      value: version.ai_interview_duration + ' Minutes',
    },
    {
      label: 'Video cover image url',
      value: version.candidate_intro_video_cover_image_url,
    },
    {
      label: 'Video url',
      value: version.candidate_intro_video_url,
    },
    {
      label: 'Welcome Message',
      value: version.ai_welcome_message,
      textArea: true,
    },
    {
      label: 'AI Ending Message',
      value: version.ai_ending_message,
      textArea: true,
    },

    {
      label: 'Questions',
      value: version.ai_questions,
      textArea: true,
    },

    {
      label: 'AI Instructions',
      value: version.ai_instructions,
      textArea: true,
    },
  ];

  const CandidateDetails = [
    {
      label: 'Candidate Estimated Time',
      value: version.candidate_estimated_time,
    },
    {
      label: 'Candidate Overview',
      value: version.candidate_overview,
      textArea: true,
    },
    {
      label: 'Candidate Instructions',
      value: version.candidate_instructions,
      textArea: true,
    },
  ];
  return (
    <ScrollArea className='h-[calc(100vh-80px)] w-full rounded-lg border border-border'>
      <div className='grid grid-cols-1 gap-6 p-4'>
        <div className='flex flex-col gap-2'>
          {AiDetails.map((detail) => (
            <Detail key={detail.label} {...detail} />
          ))}
        </div>

        <div className='flex flex-col gap-2'>
          {CandidateDetails.map((detail) => (
            <Detail key={detail.label} {...detail} />
          ))}
        </div>
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

const Detail = ({ label, value, textArea = false }: DetailType) => {
  return (
    <div className='mb-4 w-full'>
      <p className='mb-2 text-sm font-normal'>{label}</p>
      {textArea ? (
        <div className='min-h-32 overflow-auto whitespace-pre-wrap rounded-lg bg-muted p-4 text-base text-foreground'>
          {value}
        </div>
      ) : (
        <div className='text-base text-foreground'>{value}</div>
      )}
    </div>
  );
};
