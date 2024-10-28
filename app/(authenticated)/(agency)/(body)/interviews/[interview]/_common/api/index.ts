import { createTRPCRouter } from '@/server/api/trpc';

import { analysis } from './analysis';
import { applicant } from './applicant';
import { read } from './read';
import { resume } from './resume';

export const interview = createTRPCRouter({
  analysis,
  applicant,
  read,
  resume,
});
