'use client';

import FormCampaign from 'app/campaign/_common/components';

import { Loader } from '@/app/components/Loader';

import { useCampaign } from './_common/hooks/useCampaign';

const Campaign = () => {
  const { data, isLoading } = useCampaign();

  if (isLoading) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  if (!data) {
    return <div>Campaign not found</div>;
  }

  return <FormCampaign />;
};

export default Campaign;
