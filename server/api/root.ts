import 'server-only';

import { campaignUser } from 'app/campaign/_common/api';

import { authenticated } from '@/authenticated/api';

import { example } from './routers/example';
import { interview } from './routers/interview';
import { interviewAnalysis } from './routers/interview_analysis';
import { tenant } from './routers/tenant';
import { user } from './routers/user';
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
