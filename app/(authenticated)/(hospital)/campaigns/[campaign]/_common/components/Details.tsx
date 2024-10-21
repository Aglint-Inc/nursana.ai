import { Button } from '@/components/ui/button';
import {
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Sheet } from 'lucide-react';

export const Details = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm'>
          Details
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit Campaign</SheetTitle>
        </SheetHeader>
        <SheetDescription>KLKL</SheetDescription>
      </SheetContent>
    </Sheet>
  );
};
