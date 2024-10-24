import 'server-only';

import { campaign } from '@/campaign/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { interviews } from './interviews';
import { read } from './read';
import { get_applicant_detail } from './applicantDetail';

export const campaigns = createTRPCRouter({
  read,
  interviews,
  campaign,
  get_applicant_detail,
});
