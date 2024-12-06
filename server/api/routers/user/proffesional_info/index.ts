import { createTRPCRouter } from '@/server/api/trpc';

import { getProfessionalInfo } from './get';
import { updateProfessionalInfo } from './update';
export const professionalInfo = createTRPCRouter({
  get: getProfessionalInfo,
  update: updateProfessionalInfo,
});
