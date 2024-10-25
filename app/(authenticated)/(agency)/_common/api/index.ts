import 'server-only';

import { campaigns } from '@/campaigns/api';
import { createTRPCRouter } from '@/server/api/trpc';
import { templates } from '@/templates/api';

import { edit } from './edit';
import { read } from './read';
import { user } from './user';
import { reports } from 'app/(authenticated)/(agency)/templates/[version]/reports/_common/api';

export const agency = createTRPCRouter({
  read,
  edit,
  user,
  campaigns,
  templates,
  reports,
});
