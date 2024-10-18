import { useParams } from 'next/navigation';
import { api } from 'trpc/client';

export const useCampaign = () => {
  const params = useParams() as any;
  return api.authenticated.hospital.campaigns.campaign.read.useSuspenseQuery({
    id: params.campaign,
  })[0];
};
