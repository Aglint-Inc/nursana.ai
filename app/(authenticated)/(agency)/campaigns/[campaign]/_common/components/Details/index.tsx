import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

import { DetailsProvider, useDetails } from './Context';
import { Edit } from './Edit';
import { View } from './View';

const WithDetailsContext = () => {
  return (
    <DetailsProvider>
      <Details />
    </DetailsProvider>
  );
};

export { WithDetailsContext as Details };

const Details = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='outline' size='sm'>
          Details
        </Button>
      </SheetTrigger>
      <SheetContent className='min-w-[480px]'>
        <Content />
      </SheetContent>
    </Sheet>
  );
};

const Content = () => {
  const { mode } = useDetails();
  return mode === 'view' ? <View /> : <Edit />;
};
