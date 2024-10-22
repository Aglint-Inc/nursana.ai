import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { updateHospital } from './create_hospital';
import { tenantSignup } from './signup';

export const tenant = createTRPCRouter({
  signup: tenantSignup,
  update_hospital: updateHospital,
});
