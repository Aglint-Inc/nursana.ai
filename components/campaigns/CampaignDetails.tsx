"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type CampaignDetailsProps = {
  id: string;
};

export function CampaignDetails({ id }: CampaignDetailsProps) {
  const [campaign, setCampaign] = useState(null);

  useEffect(() => {
    const supabase = createClient();

    async function fetchCampaign() {
      const { data } = await supabase
        .from("campaigns")
        .select("*, interview_templates(name)")
        .eq("id", id)
        .single();
      setCampaign(data);
    }

    fetchCampaign();
  }, [id]);

  if (!campaign) return <div>Loading...</div>;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Campaign Details</h1>
      <h2 className="text-xl font-semibold">{campaign.name}</h2>
      <p>Campaign Code: {campaign.campaign_code}</p>
      <p>Description: {campaign.description}</p>
      <p>Template: {campaign.interview_templates?.name}</p>
      <Link href={`/campaigns/edit/${id}`}>
        <Button>Edit Campaign</Button>
      </Link>
    </div>
  );
}
