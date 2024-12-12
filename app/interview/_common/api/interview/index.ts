import 'server-only';

import { createTRPCRouter } from '../../../../../server/api/trpc';
import { createWebCall } from './create-web-call';
import { getInterviewDetails } from './get-inteview-details';
import { scheduleInterview } from './schedule-interview';
import { updateInterview } from './update-interview';
import { uploadResume } from './uploadResume';

export const interview = createTRPCRouter({
  getInterviewDetails,
  updateInterview,
  createWebCall,
  uploadResume,
  scheduleInterview,
});
