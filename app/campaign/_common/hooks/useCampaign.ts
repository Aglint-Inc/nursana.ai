import { useSearchParams } from "next/navigation";
import { api } from "trpc/client";

export const useCampaign = () => {
  const searchParams = useSearchParams();
  const campaign_code = searchParams.get("campaign_code") as string;
  const query = api.campaign.check.useQuery({
    code: campaign_code,
  });

  return query;
};
