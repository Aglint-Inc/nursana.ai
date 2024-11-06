import { CampaignBadge } from '@/campaigns/components/CampaignBadge';

import { useCampaign } from '../hooks/useCampaign';

export const Title = () => {
  const campaign = useCampaign();
  return (
    <h1 className='flex flex-row items-center gap-2 text-xl font-medium'>
      {campaign.name}
      <CampaignBadge status={campaign.status} />
    </h1>
  );
};
