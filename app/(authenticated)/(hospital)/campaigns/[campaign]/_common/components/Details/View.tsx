import { Settings as SettingsIcon } from 'lucide-react';
import type { PropsWithChildren } from 'react';

import { useCampaign } from '@/campaign/hooks/useCampaign';
import { Button } from '@/components/ui/button';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useDetails } from './Context';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import { capitalize } from '@/common/utils/capitalize';

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
    <Button variant={'ghost'} onClick={() => setMode('edit')}>
      <SettingsIcon size={16} />
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
  const campaign = useCampaign();

  const Details: DetailType[] = [
    { label: 'Code', value: campaign.campaign_code },
    { label: 'Description', value: campaign.description || '-' },
    { label: 'Version', value: campaign.version.name },
    { label: 'Status', value: capitalize(campaign.status) },
  ];
  return (
    <ScrollArea className='h-[calc(100vh-80px)] w-full pr-4'>
      <div className='flex flex-col gap-4'>
        {Details.map((detail) => (
          <Detail key={detail.label} {...detail} />
        ))}
      </div>
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
