import { unstable_noStore } from 'next/cache';

import { Table } from '@/campaigns/components/Table';
import { SidebarInset } from '@/components/ui/sidebar';
import { Body } from '@/campaigns/components/Body';

const Page = (props: Parameters<typeof Table>['0']) => {
  unstable_noStore();
  return (
    <SidebarInset>
      <Body>
        <Table {...props} />
      </Body>
    </SidebarInset>
  );
};

export default Page;
