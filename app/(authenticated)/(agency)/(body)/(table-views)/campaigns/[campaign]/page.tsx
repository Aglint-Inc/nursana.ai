'use client';

import { unstable_noStore } from 'next/cache';

import { Body } from '@/campaign/components/Body';
import { Table } from '@/campaign/components/Table';
import { CampaignProvider } from '@/campaign/context/campaign.context';

const Page = () => {
  unstable_noStore();
  return (
    <CampaignProvider>
      <Body>
        <Table />
      </Body>
    </CampaignProvider>
  );
};

export default Page;
