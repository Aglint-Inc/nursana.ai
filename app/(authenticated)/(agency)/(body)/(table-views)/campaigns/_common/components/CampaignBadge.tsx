import type { Campaigns } from '@/campaigns/types';
import { Badge } from '@/components/ui/badge';

export const CampaignBadge = (props: Pick<Campaigns[number], 'status'>) => {
  return (
    <Badge
      className={`rounded-md font-normal capitalize ${props.status === 'active' ? 'bg-green-500 text-white hover:bg-green-500' : 'bg-gray-200 text-muted-foreground hover:bg-gray-200'}`}
    >
      {props.status}
    </Badge>
  );
};
