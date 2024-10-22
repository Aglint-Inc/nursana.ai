import 'server-only';

import { createTRPCRouter } from '@/server/api/trpc';

import { hello, helloSchema } from './hello';
import { world, worldSchema } from './world';

export const helloWorld = createTRPCRouter({
  hello,
  world,
});

export const helloWorldSchema = {
  hello: helloSchema,
  world: worldSchema,
};
