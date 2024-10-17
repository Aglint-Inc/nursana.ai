import { TRPCError } from '@trpc/server';

import { auth } from './auth';

export const hospital = auth.unstable_pipe(
  async ({ next, ctx: { role, ...ctx } }) => {
    if (role !== 'user')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Unauthorizedd',
      });
    return await next({
      ctx: {
        ...ctx,
        role,
      },
    });
  },
);
