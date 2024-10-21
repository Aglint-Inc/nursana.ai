'use client';

import { Settings } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { useCampaign } from '@/campaign/hooks/useCampaign';
import { useCampaignParams } from '@/campaign/hooks/useCurrentCampaign';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const View = () => {
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
