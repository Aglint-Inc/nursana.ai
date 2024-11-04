import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/db/client';

import { auth } from './auth';

export const applicant = auth.unstable_pipe(
  async ({ next, ctx: { role, ...ctx } }) => {
    if (role !== 'applicant_user')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Unauthorized',
      });
    const db = createPrivateClient();
    const applicant = (
      await db
        .from('applicant_user')
        .select('*, user!applicant_user_id_fkey!inner(*)')
        .eq('id', ctx.user_id)
        .single()
        .throwOnError()
    ).data;
    if (!applicant)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Applicant not found',
      });
    const { user, ...applicant_user } = applicant;
    return await next({
      ctx: {
        ...ctx,
        role,
        applicant_user,
        user,
      },
    });
  },
);
