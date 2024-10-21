import { createTRPCRouter } from '@/server/api/trpc';

import { edit } from './edit';
import { read } from './read';
import { interviews } from './interviews';

export const campaign = createTRPCRouter({
  read,
  edit,
  interviews,
});
