import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';

import { AddForm } from './AddForm';
import { useAction } from './Context';

export const AddCampaignSlider = () => {
  const { isOpen, setIsOpen } = useAction();
  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className='min-w-[700px]'>
        <SheetHeader>
          <SheetTitle>Add Campaign</SheetTitle>
          <SheetDescription>
            <AddForm />
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
