'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCampaign } from '../hooks/useCampaign';
import { Suspense } from 'react';
import { Loader } from '@/common/components/Loader';
import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCampaignParams } from '../hooks/useCurrentCampaign';

const Comp = () => {
  const campaign = useCampaign();
  const params = useCampaignParams();
  const { push } = useRouter();
  return (
    <Card className='flex flex-col' x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle className='flex w-full flex-row items-center justify-between'>
          <div>Campaign</div>
          <Settings
            onClick={() => push(`/campaigns/${params.campaign}/edit`)}
          />
        </CardTitle>
      </CardHeader>
      <CardContent className='grid gap-8'>
        {JSON.stringify(campaign)}
      </CardContent>
    </Card>
  );
};

export const View = () => {
  return (
    <div className='flex flex-grow basis-2/3'>
      <Suspense fallback={<Loader />}>
        <Comp />
      </Suspense>
    </div>
  );
};