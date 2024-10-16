import { createTRPCRouter } from '../../trpc';
import { createHospital } from './create_hospital';
import { tenantSignup } from './signup';

export const tenant = createTRPCRouter({
  signup: tenantSignup,
  create_hospital: createHospital,
});
