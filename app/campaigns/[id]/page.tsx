import { CampaignDetails } from "@/components/campaigns/CampaignDetails";

export default function CampaignDetailsPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <CampaignDetails id={params.id} />
    </div>
  );
}
