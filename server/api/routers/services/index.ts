import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { placesAutocomplete } from './placesAutocomplete';

export const services = createTRPCRouter({
  placesAutocomplete,
});
