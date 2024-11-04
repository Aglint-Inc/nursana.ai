import { unstable_noStore } from 'next/cache';

import { Body } from '@/interviews/components/Body';
import { Table } from '@/interviews/components/Table';

const Page = (props: Parameters<typeof Table>['0']) => {
  unstable_noStore();
  return (
    <Body>
      <Table {...props} />
    </Body>
  );
};

export default Page;
