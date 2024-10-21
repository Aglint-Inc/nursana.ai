import { hospital } from '@/hospital/api';
import { createTRPCRouter } from '@/server/api/trpc';

import { role } from './role';

export const authenticated = createTRPCRouter({ role, hospital });
