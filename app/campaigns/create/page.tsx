import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { createCampaign } from "@/app/actions/campaignActions";
import { createClient } from "@/utils/supabase/server";

export default async function CreateCampaignPage() {
  const supabase = createClient();
  const { data: templates } = await supabase
    .from("interview_templates")
    .select("id, name")
    .order("name");

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Create Campaign</h1>
      <CampaignForm action={createCampaign} templates={templates || []} />
    </div>
  );
}
