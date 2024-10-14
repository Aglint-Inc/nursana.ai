import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export default async function CampaignsPage() {
  const supabase = createClient();
  const { data: campaigns } = await supabase
    .from("campaigns")
    .select("id")
    .limit(1);

  if (campaigns && campaigns.length > 0) {
    redirect(`/campaigns/${campaigns[0].id}`);
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">No Campaigns</h1>
      <p>Create a new campaign to get started.</p>
    </div>
  );
}
