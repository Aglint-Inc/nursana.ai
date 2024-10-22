import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/server/db';

import { auth } from './auth';

export const hospital = auth.unstable_pipe(
  async ({ next, ctx: { role, ...ctx } }) => {
    if (role !== 'user')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Unauthorizedd',
      });
    const db = createPrivateClient();

    const data = (
      await db
        .from('user')
        .select('*, hospital!tenant_hospital_id_fkey!inner(*)')
        .eq('user_id', ctx.user_id)
        .single()
        .throwOnError()
    ).data;

    if (!data)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'User not found',
      });

    const { hospital, ...user } = data;

    return await next({
      ctx: {
        ...ctx,
        role,
        user,
        hospital,
      },
    });
  },
);
