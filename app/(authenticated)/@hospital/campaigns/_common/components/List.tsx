import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useCampaigns } from '@/hospital/hooks/useCampaigns';

type CampaignType = ReturnType<typeof useCampaigns>[number];

export const List = () => {
  const campaigns = useCampaigns();
  return (
    <Card x-chunk='dashboard-01-chunk-4'>
      <CardHeader className='flex flex-row items-center'>
        <div className='grid gap-2'>
          <CardTitle>Campaigns</CardTitle>
          <CardDescription>List of recent campaigns.</CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className='text-center'>Code</TableHead>
              <TableHead className='text-right'>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {campaigns.map((props) => (
              <Campaign key={props.id} {...props} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

const Campaign = (props: CampaignType) => {
  return (
    <TableRow>
      <Name {...props} />
      <Code {...props} />
      <Status {...props} />
    </TableRow>
  );
};

const Name = (props: Pick<CampaignType, 'name' | 'description'>) => (
  <TableCell>
    <div className='font-medium'>{props.name}</div>
    <div className='text-sm text-muted-foreground md:inline'>
      {props.description}
    </div>
  </TableCell>
);

const Code = (props: Pick<CampaignType, 'campaign_code'>) => (
  <TableCell className='text-center'>
    <div className='font-medium'>{props.campaign_code ?? '---'}</div>
  </TableCell>
);

const Status = (props: Pick<CampaignType, 'status'>) => (
  <TableCell className='text-right'>
    <Badge
      className='text-xs capitalize'
      variant={props.status === 'active' ? 'outline' : 'default'}
    >
      {props.status}
    </Badge>
  </TableCell>
);
