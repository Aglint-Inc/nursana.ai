import {
  Hash,
  Settings as SettingsIcon,
  Info,
  FileText,
  CircleDashed,
  Copy,
  Check,
  FilePenLine,
} from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { useCampaign } from '@/campaign/hooks/useCampaign';
import { capitalize } from '@/common/utils/capitalize';
import { Button } from '@/components/ui/button';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useDetails } from './Context';
import { campaign } from '@/campaign/api';
import Link from 'next/link';
import { useState } from 'react';

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
    <SheetHeader className='translate-y-[-16px] h-10 flex justify-center'>
      <Title />
    </SheetHeader>
  );
};

const Title = (props: PropsWithChildren) => {
  const campaign = useCampaign();
  return (
    <SheetTitle className='flex flex-row items-center gap-2 capitalize'>
      {campaign.name}
      {props.children}
    </SheetTitle>
  );
};

const Settings = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'secondary'} size={'sm'} onClick={() => setMode('edit')}>
      <FilePenLine size={12} />
      Edit Campagin Details
    </Button>
  );
};

const Body = () => {
  return (
    <SheetDescription className='flex flex-col items-start gap-6'>
      <Settings />
      <Content />
    </SheetDescription>
  );
};

type DetailType = {
  label: string;
  value: string | number | null | string[];
  textArea?: boolean;
  icon?: React.ReactNode; // Optional icon property
};

const Content = () => {
  const campaign = useCampaign();

  const Details: DetailType[] = [
    {
      label: 'Campaign Code',
      value: campaign.campaign_code,
      icon: <Hash size={16} />,
    },
    {
      label: 'Description',
      value: campaign.description || '-',
      icon: <FileText size={16} />,
    },
    {
      label: 'Version',
      value: campaign.version.name,
      icon: <Info size={16} />,
    },
    {
      label: 'Status',
      value: capitalize(campaign.status),
      icon: <CircleDashed size={16} />,
    },
  ];

  return (
    <ScrollArea className='h-[calc(100vh-80px)] w-full pr-4'>
      <div className='flex flex-col gap-1'>
        {Details.map((detail) => (
          <Detail key={detail.label} {...detail} />
        ))}
      </div>
      <ScrollBar />
    </ScrollArea>
  );
};

const Detail = ({ label, value, textArea = false, icon }: DetailType) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (label === 'Campaign Code' && typeof value === 'string') {
      navigator.clipboard
        .writeText(value)
        .then(() => {
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 2000);
        })
        .catch((err) => {
          console.error('Failed to copy: ', err);
        });
    }
  };

  return (
    <div className='mb-4 w-full'>
      <div className='mb-2 flex items-center'>
        {icon && <div className='mr-2'>{icon}</div>}
        <p className='font-normal'>{label}</p>
      </div>
      {textArea ? (
        <div className='whitespace-pre-wrap rounded-sm bg-gray-100 p-2'>
          {value}
        </div>
      ) : (
        <div className='flex items-center'>
          <div className='text-black'>{value}</div>
          {label === 'Campaign Code' && (
            <div
              className='ml-3 flex h-6 w-6 cursor-pointer items-center justify-center rounded-sm bg-muted transition-all hover:bg-muted/50'
              onClick={handleCopy}
            >
              {copied ? (
                <Check className='text-green-600' size={14} />
              ) : (
                <Copy size={14} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
