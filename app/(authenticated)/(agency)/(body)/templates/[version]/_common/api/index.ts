import { createTRPCRouter } from '@/server/api/trpc';

import { edit } from './edit';
import { read } from './read';
import { reports } from './reports';

export const version = createTRPCRouter({
  read,
  edit,
  reports,
});
