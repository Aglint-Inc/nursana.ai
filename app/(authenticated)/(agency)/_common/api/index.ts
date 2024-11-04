import 'server-only';

import { campaigns } from '@/campaigns/api';
import { createTRPCRouter } from '@/server/api/trpc';
import { interviews } from '@/table-views/api';
import { templates } from '@/templates/api';

import { edit } from './edit';
import { read } from './read';
import { user } from './user';

export const agency = createTRPCRouter({
  read,
  edit,
  user,
  campaigns,
  templates,
  interviews,
});
