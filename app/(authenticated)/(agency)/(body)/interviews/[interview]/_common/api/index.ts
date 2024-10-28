import { createTRPCRouter } from '@/server/api/trpc';

import { analysis } from './analysis';
import { applicant } from './applicant';
import { audio } from './audio';
import { read } from './read';
import { resume } from './resume';
import { video } from './video';

export const interview = createTRPCRouter({
  analysis,
  applicant,
  audio,
  read,
  resume,
  video,
});
