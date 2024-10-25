import 'server-only';

import { agency } from '@/agency/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { role } from './role';

export const authenticated = createTRPCRouter({ role, agency });
