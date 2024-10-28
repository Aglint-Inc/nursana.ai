import type { PageProps as CampaignsPageProps } from '@/campaigns/types';

export type PageProps = CampaignsPageProps & {
  params: { campaign: string };
};
