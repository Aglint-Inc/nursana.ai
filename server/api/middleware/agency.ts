import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/server/db';

import { auth } from './auth';

export const agency = auth.unstable_pipe(
  async ({ next, ctx: { role, ...ctx } }) => {
    if (role !== 'agency_user')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Unauthorizedd',
      });
    const db = createPrivateClient();

    const data = (
      await db
        .from('user')
        .select(
          '*, agency_user!agency_user_id_fkey!inner(*, agency!agency_user_agency_id_fkey!inner(*))',
        )
        .eq('user_id', ctx.user_id)
        .single()
        .throwOnError()
    ).data;

    if (!data)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Agency User not found',
      });

    const {
      agency_user: { agency, ...agency_user },
      ...user
    } = data;

    return await next({
      ctx: {
        ...ctx,
        role,
        agency,
        agency_user,
        user,
      },
    });
  },
);
