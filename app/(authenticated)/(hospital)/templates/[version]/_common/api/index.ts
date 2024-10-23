import { createTRPCRouter } from '@/server/api/trpc';

import { edit } from './edit';
import { read } from './read';

export const version = createTRPCRouter({
  read,
  edit,
});
