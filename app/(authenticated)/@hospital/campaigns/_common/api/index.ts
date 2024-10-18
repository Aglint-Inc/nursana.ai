import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';

export const campaigns = createTRPCRouter({
  read,
});
