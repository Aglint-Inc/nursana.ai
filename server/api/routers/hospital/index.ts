import { createTRPCRouter } from '../../trpc';
import { tenantHospital } from './get_data';

export const hospital = createTRPCRouter({
  get_data: tenantHospital,
});
