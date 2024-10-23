import { ScrollArea } from '@radix-ui/react-scroll-area';
import _ from 'lodash';
import { Settings2Icon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Textarea } from '@/components/ui/textarea';

import { useVersion } from '../../../hooks/useVersion';
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
  const details: DetailType[] = [
    // ai
    {
      label: 'AI Instructions',
      value: version.ai_instructions,
    },
    {
      label: 'Interview Duration',
      value: version.ai_interview_duration + ' Minutes',
    },
    {
      label: 'Questions',
      value: version.ai_questions,
      textArea: true,
    },
    {
      label: 'Welcome Message',
      value: version.ai_welcome_message,
    },
    // candidate
    {
      label: 'Candidate Estimated Time',
      value: version.candidate_estimated_time,
    },
    {
      label: 'Candidate Instructions',
      value: version.candidate_instructions,
    },
    {
      label: 'Candidate Overview',
      value: version.candidate_overview,
    },
  ];
  return (
    <ScrollArea className='h-[calc(100vh-160px)] w-full overflow-y-auto'>
      <div className='flex flex-col gap-4'>
        {details.map((detail) => (
          <Detail key={detail.label} {...detail} />
        ))}
      </div>
    </ScrollArea>
  );
};

const Detail = ({ label, value, textArea = false }: DetailType) => {
  return (
    <div className='mb-4 w-full'>
      <p className='mb-2 font-bold'>{label}</p>
      {textArea ? (
        <Textarea
          disabled
          value={value as string}
          className='min-h-[200px] !cursor-default disabled:bg-gray-100 disabled:text-gray-800 disabled:opacity-100'
        />
      ) : _.isArray(value) ? (
        <div className='flex flex-col gap-2'>
          <List lists={value} />
        </div>
      ) : (
        value
      )}
    </div>
  );
};

const List = ({ lists }: { lists: string[] }) => {
  return (
    <>
      {lists.map((list) => (
        <p key={list} className='rounded-sm bg-gray-100 p-2'>
          {list}
        </p>
      ))}
    </>
  );
};
