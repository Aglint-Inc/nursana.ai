import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { fetchCampaign } from '@/lib/api'; // Implement this function to fetch a campaign by ID
import { EditCampaign } from './EditCampaign';

type ViewCampaignProps = {
  campaignId: string;
};

export function ViewCampaign({ campaignId }: ViewCampaignProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { data: campaign, isLoading, error } = useQuery(['campaign', campaignId], () => fetchCampaign(campaignId));

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading campaign</div>;
  if (!campaign) return <div>Campaign not found</div>;

  if (isEditing) {
    return <EditCampaign campaignId={campaignId} onCancel={() => setIsEditing(false)} />;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{campaign.name}</h1>
      <p>Campaign Code: {campaign.campaign_code}</p>
      <p>Description: {campaign.description}</p>
      <p>Template: {campaign.template?.name}</p>
      {/* Display more campaign details */}
      <Button onClick={() => setIsEditing(true)} className="mt-4">Edit Campaign</Button>
    </div>
  );
}
