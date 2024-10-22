import 'server-only';

import { campaign } from '@/campaign/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { interviews } from './interviews';

export const campaigns = createTRPCRouter({
  read,
  interviews,
  campaign,
});
