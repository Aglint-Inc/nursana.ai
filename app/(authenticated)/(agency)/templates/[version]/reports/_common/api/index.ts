import 'server-only';
import { createTRPCRouter } from '@/server/api/trpc';
import { stats } from './stats';
import { resumeAnalysis } from './resumeAnalysis';

export const reports = createTRPCRouter({
  stats,
  resumeAnalysis,
});
