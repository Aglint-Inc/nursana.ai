import type { Campaigns } from '@/campaigns/types';
import { Badge } from '@/components/ui/badge';

export const CampaignBadge = (props: Pick<Campaigns[number], 'status'>) => {
  return (
    <Badge
      variant={props.status === 'active' ? 'outline' : 'default'}
      className='capitalize'
    >
      {props.status}
    </Badge>
  );
};
