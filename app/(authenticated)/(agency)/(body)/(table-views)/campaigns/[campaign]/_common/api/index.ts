import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { edit } from './edit';
import { read } from './read';

export const campaign = createTRPCRouter({
  read,
  edit,
});
