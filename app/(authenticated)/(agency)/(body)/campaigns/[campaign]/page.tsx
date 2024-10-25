import { unstable_noStore } from 'next/cache';

import { Body } from '@/campaign/components/Body';
import { Table } from '@/campaign/components/Table';
import { CampaignProvider } from '@/campaign/context/campaign.context';

const Page = (props: Parameters<typeof Table>['0']) => {
  unstable_noStore();
  return (
    <CampaignProvider>
      <Body>
        <Table {...props} />
      </Body>
    </CampaignProvider>
  );
};

export default Page;
