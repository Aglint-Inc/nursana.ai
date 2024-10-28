import 'server-only';

import { campaign } from '@/campaign/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { add } from './add';
import { interviews } from './interviews';
import { read } from './read';

export const campaigns = createTRPCRouter({
  read,
  interviews,
  campaign,
  add,
});
