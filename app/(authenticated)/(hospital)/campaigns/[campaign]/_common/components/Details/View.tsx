import { Settings as SettingsIcon } from 'lucide-react';

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
      <SheetTitle className='flex flex-row items-center gap-2'>
        Campaign
        <Settings />
      </SheetTitle>
    </SheetHeader>
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
