import 'server-only';

import { authenticated } from '@/authenticated/api';

import { campaign } from './routers/campaign';
import { example } from './routers/example';
import { interview } from './routers/interview';
import { interviewAnalysis } from './routers/interview_analysis';
import { tenant } from './routers/tenant';
import { uploadRouter } from './routers/upload/room';
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
  campaign,
  tenant,
  interview,
  interviewAnalysis,
  supabase_storage,
  upload: uploadRouter,
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
