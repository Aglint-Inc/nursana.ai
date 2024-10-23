import { ArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useDetails } from './Context';
import { EditForm } from './EditForm';

export const Edit = () => {
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
        Edit Version
        <Back />
      </SheetTitle>
    </SheetHeader>
  );
};

const Back = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'ghost'} onClick={() => setMode('view')}>
      <ArrowLeft size={16} />
    </Button>
  );
};

const Body = () => {
  return (
    <SheetDescription>
      <EditForm />
    </SheetDescription>
  );
};
