import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { uploadCampaign } from './campaign';
import { userCheck } from './check_user';
import { campaignCheck } from './check-campaign';

export const campaignUser = createTRPCRouter({
  check_campaign: campaignCheck,
  check_user: userCheck,
  upload: uploadCampaign,
});