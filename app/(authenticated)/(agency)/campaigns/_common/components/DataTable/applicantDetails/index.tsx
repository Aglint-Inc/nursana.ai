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
  const { isOpen, setIsOpen, applicantId } = useApplicantDetail();
  return (
    <Drawer open={isOpen} onClose={() => setIsOpen(false)}>
      <DrawerTrigger>Open</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Applicant</DrawerTitle>
          <DrawerDescription>{applicantId}</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
};
