import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { bar, barSchema } from './bar';
import { foo } from './foo';

export const fooBar = createTRPCRouter({
  foo,
  bar,
});

export const fooBarSchema = {
  bar: barSchema,
};
