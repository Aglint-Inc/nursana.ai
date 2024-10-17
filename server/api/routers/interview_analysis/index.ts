import { createTRPCRouter } from '../../trpc';
import { updateInterviewAnalysis } from './update-interview-analysis';

export const interviewAnalysis = createTRPCRouter({
  updateInterviewAnalysis,
});
