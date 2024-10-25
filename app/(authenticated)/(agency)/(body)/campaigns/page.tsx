import { unstable_noStore } from 'next/cache';

import { Body } from '@/campaigns/components/Body';
import { Table } from '@/campaigns/components/Table';

const Page = (props: Parameters<typeof Table>['0']) => {
  unstable_noStore();
  return (
    <Body>
      <Table {...props} />
    </Body>
  );
};

export default Page;
