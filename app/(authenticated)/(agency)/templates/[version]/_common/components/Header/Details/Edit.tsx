import { ChevronLeft } from 'lucide-react';

import {
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { useDetails } from './Context';
import { EditForm } from './EditForm';
import { Button } from '@/components/ui/button';

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
      <SheetTitle className='flex flex-row items-center gap-2 text-base font-medium'>
        <Back />
        Edit Template
      </SheetTitle>
    </SheetHeader>
  );
};

const Back = () => {
  const { setMode } = useDetails();
  return (
    <Button variant={'secondary'} size={'sm'} onClick={() => setMode('view')}>
      <ChevronLeft size={12} />
      Back
    </Button>
  );
};

const Body = () => {
  return (
    <SheetDescription>
      {/* <FileUpload /> */}
      <EditForm />
    </SheetDescription>
  );
};
