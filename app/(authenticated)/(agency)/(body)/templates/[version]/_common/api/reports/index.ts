import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { resumeAnalysis } from './resumeAnalysis';
import { stats } from './stats';

export const reports = createTRPCRouter({
  stats,
  resumeAnalysis,
});
