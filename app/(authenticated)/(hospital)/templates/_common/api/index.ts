import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { version } from '../../[version]/_common/api';
import { read } from './read';

export const templates = createTRPCRouter({
  read,
  version,
});
