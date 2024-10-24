import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { useApplicantDetail } from './Context';

export const ApplicationDetailsDrawer = () => {
  const { isOpen, setIsOpen, data, isLoading } = useApplicantDetail();
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Applicant</DrawerTitle>
          <DrawerDescription>
            {JSON.stringify(data)} | {isLoading ? 'Loading...' : 'Loaded'}
          </DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
