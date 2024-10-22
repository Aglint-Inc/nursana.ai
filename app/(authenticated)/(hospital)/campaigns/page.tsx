'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useCampaigns } from './_common/hooks/useCampaigns';

const Page = () => {
  const campaigns = useCampaigns();
  const router = useRouter();
  useEffect(() => {
    if (campaigns.length) {
      router.push(`/campaigns/${campaigns[0].id}`);
    }
  }, [campaigns]);
  return null;
};

export default Page;
