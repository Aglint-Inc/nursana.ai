import 'server-only';

import { hospital } from '@/agency/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { role } from './role';

export const authenticated = createTRPCRouter({ role, hospital });
