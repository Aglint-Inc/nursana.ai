import 'server-only';

import { createTRPCRouter } from '../../trpc';
import { fooBar, fooBarSchema } from './fooBar';
import { helloWorld, helloWorldSchema } from './helloWorld';

export const example = createTRPCRouter({
  helloWorld,
  fooBar,
});

export const exampleSchema = {
  helloWorld: helloWorldSchema,
  fooBar: fooBarSchema,
};
