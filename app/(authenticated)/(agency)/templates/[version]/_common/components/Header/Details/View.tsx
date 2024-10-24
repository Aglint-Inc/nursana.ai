import { Settings2Icon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
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
        <Settings />
      </Title>
    </SheetHeader>
  );
};

const Title = (props: PropsWithChildren) => {
  const version = useVersion();
  return (
    <SheetTitle className='flex flex-row items-center gap-2 capitalize'>
      {version.name}
      {props.children}
    </SheetTitle>
  );
};

const Settings = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'ghost'} onClick={() => setMode('edit')}>
      <Settings2Icon size={16} />
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
    <ScrollArea className='h-[calc(100vh-80px)] w-full pr-4'>
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='ai_details'>
          <AccordionTrigger>AI Details</AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-4'>
              {AiDetails.map((detail) => (
                <Detail key={detail.label} {...detail} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value='candidate_details'>
          <AccordionTrigger>Candidate Details</AccordionTrigger>
          <AccordionContent>
            <div className='flex flex-col gap-4'>
              {CandidateDetails.map((detail) => (
                <Detail key={detail.label} {...detail} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <ScrollBar />
    </ScrollArea>
  );
};

const Detail = ({ label, value, textArea = false }: DetailType) => {
  return (
    <div className='mb-4 w-full'>
      <p className='mb-2 font-bold'>{label}</p>
      {textArea ? (
        <div className='whitespace-pre-wrap rounded-sm bg-gray-100 p-2'>
          {value}
        </div>
      ) : (
        value
      )}
    </div>
  );
};
