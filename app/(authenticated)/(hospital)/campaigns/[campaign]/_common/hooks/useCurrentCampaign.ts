import { useParams } from 'next/navigation';

export const useCampaignParams = () => {
  const params = useParams() as any;
  return {
    campaign: params.campaign as string,
  };
};
