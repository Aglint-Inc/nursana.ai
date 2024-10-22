import 'server-only';

import { campaigns } from '@/campaigns/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { user } from './user';

export const hospital = createTRPCRouter({
  read,
  user,
  campaigns,
});
