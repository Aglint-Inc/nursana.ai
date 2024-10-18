'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCampaign } from '../hooks/useCampaign';
import { Suspense } from 'react';
import { Loader } from '@/common/components/Loader';

const Comp = () => {
  const campaign = useCampaign();
  return (
    <Card className='flex flex-col' x-chunk='dashboard-01-chunk-5'>
      <CardHeader>
        <CardTitle>Campaign</CardTitle>
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
