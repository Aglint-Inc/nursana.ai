'use client';

import { Loader } from '@/common/components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';
import { useCampaign } from '../hooks/useCampaign';
import { useCampaignParams } from '../hooks/useCurrentCampaign';
import { Input } from '@/components/ui/input';

const Comp = () => {
  const campaign = useCampaign();
  const params = useCampaignParams();
  const { push } = useRouter();
  return (
    <Card className='flex flex-col' x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle className='flex w-full flex-row items-center justify-between'>
          <div>Campaign Edit</div>
          <X onClick={() => push(`/campaigns/${params.campaign}`)} />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {JSON.stringify(campaign)}
      </CardContent>
    </Card>
  );
};

export const Edit = () => {
  return (
    <div className='flex flex-grow basis-2/3'>
      <Suspense fallback={<Loader />}>
        <Comp />
      </Suspense>
    </div>
  );
};
