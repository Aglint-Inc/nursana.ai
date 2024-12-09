import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { createWebCall } from './create-web-call';
import { getInterviewDetails } from './get-inteview-details';
import { updateInterview } from './update-interview';
import { uploadResume } from './uploadResume';

export const interview = createTRPCRouter({
  getInterviewDetails,
  updateInterview,
  createWebCall,
  uploadResume,
});
