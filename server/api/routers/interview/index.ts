import { createTRPCRouter } from '../../trpc';
import { getInterviewDetails } from './get-inteview-details';
import { updateInterview } from './update-interview';

export const interview = createTRPCRouter({
  getInterviewDetails,
  updateInterview,
});
