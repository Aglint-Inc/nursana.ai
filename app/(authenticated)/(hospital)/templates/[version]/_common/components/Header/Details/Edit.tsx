import { ChevronLeft } from 'lucide-react';

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
        <Back />
        Edit Version
      </SheetTitle>
    </SheetHeader>
  );
};

const Back = () => {
  const { setMode } = useDetails();
  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events
    <div
      onClick={() => setMode('view')}
      className='cursor-pointer rounded-sm p-1 hover:bg-gray-200'
    >
      <ChevronLeft size={15} />
    </div>
  );
};

const Body = () => {
  return (
    <SheetDescription>
      <EditForm />
    </SheetDescription>
  );
};
