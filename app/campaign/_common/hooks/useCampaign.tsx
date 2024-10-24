import { useSearchParams } from 'next/navigation';
import { api } from 'trpc/client';

export const useCampaign = () => {
  const searchParams = useSearchParams();
  const campaign_code = searchParams.get('campaign_code') as string;
  const query = api.campaign_user.check_campaign.useQuery(
    {
      code: campaign_code,
    },
    {
      staleTime: Infinity,
    },
  );

  return { ...query, data: query.data! };
};
