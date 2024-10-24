import { SidebarInset } from '@/components/ui/sidebar';

import { Body } from './_common/components/Body';

const Page = () => {
  return (
    <SidebarInset className='h-[calc(100vh-300px)] overflow-auto border border-border'>
      <Body>version Detail page</Body>
    </SidebarInset>
  );
};

export default Page;
