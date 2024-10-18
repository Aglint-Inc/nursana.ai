import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { user } from './user';
import { campaign } from './camapign';

export const hospital = createTRPCRouter({
  read,
  user,
  campaign,
});
