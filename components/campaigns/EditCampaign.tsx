import { CampaignForm } from "./CampaignForm";
import { useQuery } from "@tanstack/react-query";
import { fetchCampaign, updateCampaign } from "@/lib/api"; // Implement these functions

type EditCampaignProps = {
  campaignId: string;
  onCancel: () => void;
};

export function EditCampaign({ campaignId, onCancel }: EditCampaignProps) {
  const { data: campaign, isLoading } = useQuery(["campaign", campaignId], () =>
    fetchCampaign(campaignId)
  );

  const handleSubmit = async (data: any) => {
    try {
      await updateCampaign(campaignId, data);
      // Handle success (e.g., show a success message, redirect to campaign view)
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Edit Campaign</h1>
      <CampaignForm initialData={campaign} onSubmit={handleSubmit} />
      <button onClick={onCancel} className="mt-4">
        Cancel
      </button>
    </div>
  );
}
