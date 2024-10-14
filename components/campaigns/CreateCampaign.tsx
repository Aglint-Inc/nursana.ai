import { CampaignForm } from "./CampaignForm";
import { createCampaign } from "@/lib/api"; // Implement this function to create a campaign via your API

export function CreateCampaign() {
  const handleSubmit = async (data: any) => {
    try {
      await createCampaign(data);
      // Handle success (e.g., show a success message, redirect to campaign list)
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Create New Campaign</h1>
      <CampaignForm onSubmit={handleSubmit} />
    </div>
  );
}
