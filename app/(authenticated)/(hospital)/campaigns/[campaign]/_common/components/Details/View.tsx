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
  const campaign = useCampaign();
  return <SheetDescription>{JSON.stringify(campaign)}</SheetDescription>;
};