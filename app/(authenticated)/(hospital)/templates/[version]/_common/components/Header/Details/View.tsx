import { Settings2Icon } from 'lucide-react';
import { type PropsWithChildren } from 'react';

import { Button } from '@/components/ui/button';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

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
  const version = useVersion();
  return <SheetDescription>{JSON.stringify(version)}</SheetDescription>;
};
