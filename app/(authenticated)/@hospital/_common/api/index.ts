import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { user } from './user';
import { campaigns } from './campaigns';

export const hospital = createTRPCRouter({
  read,
  user,
  campaigns,
});
