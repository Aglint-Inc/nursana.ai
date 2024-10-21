'use client';

import { Body } from '@/campaign/components/Body';
import { Table } from '@/campaign/components/Table';
import { SidebarInset } from '@/components/ui/sidebar';

const Page = () => {
  return (
    <SidebarInset>
      <Body>
        <Table />
      </Body>
    </SidebarInset>
  );
};

export default Page;
