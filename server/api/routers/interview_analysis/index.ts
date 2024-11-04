import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { fetchResumeStructure } from './fetch-resume-structure';
import { updateInterviewAnalysis } from './update-interview-analysis';

export const interviewAnalysis = createTRPCRouter({
  updateInterviewAnalysis,

  fetchResumeStructure,
});
