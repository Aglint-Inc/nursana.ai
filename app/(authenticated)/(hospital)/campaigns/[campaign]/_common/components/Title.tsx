import { CampaignBadge } from '@/campaigns/components/CampaignBadge';
import { useCampaign } from '../hooks/useCampaign';

export const Title = () => {
  const campaign = useCampaign();
  return (
    <h1 className='mb-4 text-xl font-bold'>
      {campaign.name}
      <CampaignBadge status={campaign.status} />
    </h1>
  );
};
