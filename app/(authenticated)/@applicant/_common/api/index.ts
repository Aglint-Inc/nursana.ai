import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';

export const applicant = createTRPCRouter({
  read,
});
