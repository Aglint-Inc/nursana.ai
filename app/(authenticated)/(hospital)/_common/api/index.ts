import 'server-only';

import { campaigns } from '@/campaigns/api';
import { createTRPCRouter } from '@/server/api/trpc';
import { templates } from '@/templates/api';

import { read } from './read';
import { user } from './user';

export const hospital = createTRPCRouter({
  read,
  user,
  campaigns,
  templates,
});
