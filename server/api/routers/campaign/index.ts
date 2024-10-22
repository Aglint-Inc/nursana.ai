import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { campaignCheck } from './check';
import { userCheck } from './check_user';

export const campaign = createTRPCRouter({
  check: campaignCheck,
  check_user: userCheck,
});
