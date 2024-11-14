'use client';

import FormCampaign from 'app/campaign/_common/components';
import { usePostHog } from 'posthog-js/react';
import { useEffect } from 'react';

import { Loader } from '@/app/components/Loader';

import { useCampaign } from './_common/hooks/useCampaign';

const Campaign = () => {
  const posthog = usePostHog();

  useEffect(() => {
    const hasCaptured = localStorage.getItem('campaign_opened');
    if (!hasCaptured) {
      posthog.capture('campaign_opened');
      localStorage.setItem('campaign_opened', 'true');
    }
  }, []);

  const { data, isLoading } = useCampaign();

  if (isLoading) {
    return (
      <div className='fixed h-screen w-screen bg-white'>
        <Loader className='text-purple-600' />
      </div>
    );
  }

  if (!data) {
    return <div>Campaign not found</div>;
  }

  return <FormCampaign />;
};

export default Campaign;
