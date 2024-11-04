import 'server-only';

import { campaigns } from '@/campaigns/api';
import { interviews } from '@/interviews/api';
import { createTRPCRouter } from '@/server/api/trpc';
import { templates } from '@/templates/api';

import { reports } from '../../(body)/templates/[version]/reports/_common/api';
import { edit } from './edit';
import { read } from './read';
import { user } from './user';

export const agency = createTRPCRouter({
  read,
  edit,
  user,
  campaigns,
  templates,
  reports,
  interviews,
});
