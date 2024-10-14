import { CampaignForm } from "@/components/campaigns/CampaignForm";
import { updateCampaign } from "@/app/actions/campaignActions";
import { createClient } from "@/utils/supabase/server";

export default async function EditCampaignPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = createClient();
  const [{ data: campaign }, { data: templates }] = await Promise.all([
    supabase.from("campaigns").select("*").eq("id", params.id).single(),
    supabase.from("interview_templates").select("id, name").order("name"),
  ]);

  const action = updateCampaign.bind(null, params.id);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Campaign</h1>
      <CampaignForm
        initialData={campaign}
        action={action}
        templates={templates || []}
      />
    </div>
  );
}
