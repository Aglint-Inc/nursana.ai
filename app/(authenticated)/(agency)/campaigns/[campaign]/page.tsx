import { unstable_noStore } from 'next/cache';

import { Body } from '@/campaign/components/Body';
import { Table } from '@/campaign/components/Table';
import { SidebarInset } from '@/components/ui/sidebar';

const Page = (props: Parameters<typeof Table>['0']) => {
  unstable_noStore();
  return (
    <SidebarInset  className='h-[calc(100vh-300px)] overflow-auto border border-border'>
      <Body>
        <Table {...props} />
      </Body>
    </SidebarInset>
  );
};

export default Page;
