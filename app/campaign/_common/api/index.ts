import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { uploadCampaign } from './campaign-with-resume';
import { uploadCampaignWithoutResume } from './campaign-without-resume';
import { userCheck } from './check_user';
import { campaignCheck } from './check-campaign';
import { uploadResume } from './uploadCandidateResume';

export const campaignUser = createTRPCRouter({
  check_campaign: campaignCheck,
  check_user: userCheck,
  upload: uploadCampaign,
  uploadResume,
  upload_without_resume: uploadCampaignWithoutResume,
});
