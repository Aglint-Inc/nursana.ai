import { interview } from '@/interview/api';
import { createTRPCRouter } from '@/server/api/trpc';

export const interviews = createTRPCRouter({
  interview,
});
