import 'server-only';

import { campaign } from '@/campaign/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { get_applicant_detail } from '../components/DataTable/applicantDetails/_common/api/read';
import { interviews } from './interviews';
import { read } from './read';

export const campaigns = createTRPCRouter({
  read,
  interviews,
  campaign,
  get_applicant_detail,
});
