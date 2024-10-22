import { createTRPCRouter } from '@/server/api/trpc';

import { edit } from './edit';
import { interviews } from './interviews';
import { read } from './read';

export const campaign = createTRPCRouter({
  read,
  edit,
  interviews,
});
