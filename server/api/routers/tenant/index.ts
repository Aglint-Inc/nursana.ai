import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { updateAgency } from './create_agency';
import { tenantSignup } from './signup';

export const tenant = createTRPCRouter({
  signup: tenantSignup,
  update_agency: updateAgency,
});
