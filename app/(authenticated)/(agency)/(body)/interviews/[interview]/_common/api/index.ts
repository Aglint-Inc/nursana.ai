import { createTRPCRouter } from '@/server/api/trpc';

import { read } from './read';
import { home } from './home';

export const interview = createTRPCRouter({
  read,
  home,
});
