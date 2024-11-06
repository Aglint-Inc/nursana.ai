'use client';

import { Body } from '@/campaigns/components/Body';
import { Table } from '@/campaigns/components/Table';

const Page = (props: Parameters<typeof Table>['0']) => {
  return (
    <Body>
      <Table {...props} />
    </Body>
  );
};

export default Page;
