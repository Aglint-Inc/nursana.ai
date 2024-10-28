import type { Campaigns } from '@/campaigns/types';
import { Badge } from '@/components/ui/badge';

export const CampaignBadge = (props: Pick<Campaigns[number], 'status'>) => {
  return (
    <Badge

       className={`capitalize rounded-md font-normal  ${props.status === 'active' ? 'bg-green-500 hover:bg-green-500 text-white':'bg-gray-200 hover:bg-gray-200 text-muted-foreground'}`}
    >
      {props.status}
    </Badge>
  );
};
