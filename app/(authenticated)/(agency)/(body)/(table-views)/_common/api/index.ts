import { interview } from '@/interview/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';

export const interviews = createTRPCRouter({
  read,
  interview,
});
