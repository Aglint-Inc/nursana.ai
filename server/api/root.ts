import 'server-only';

import { campaignUser } from 'app/campaign/_common/api';
import { uploadResume } from 'app/campaign/_common/api/uploadCandidateResume';

import { authenticated } from '@/authenticated/api';

import { interview } from '../../app/interview/_common/api/interview';
import { example } from './routers/example';
import { interviewAnalysis } from './routers/interview_analysis';
import { getLocationList } from './routers/location-list';
import { services } from './routers/services';
import { tenant } from './routers/tenant';
import { user } from './routers/user';
import { interviewFeedback } from './routers/user_interiew_rating';
import { supabase_storage } from './supabse_storage';
import { createCallerFactory, createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  authenticated,
  example,
  user,
  tenant,
  interview,
  interviewAnalysis,
  supabase_storage,
  campaign_user: campaignUser,
  getLocationList,
  interviewFeedback,
  uploadResume,
  services,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
