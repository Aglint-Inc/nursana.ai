import { TRPCError } from '@trpc/server';

import { createPrivateClient } from '@/server/db';

import { auth } from './auth';

export const applicant = auth.unstable_pipe(
  async ({ next, ctx: { role, ...ctx } }) => {
    if (role !== 'applicant')
      throw new TRPCError({
        code: 'FORBIDDEN',
        message: 'Unauthorized',
      });
    const db = createPrivateClient();
    const applicant = (
      await db
        .from('applicant')
        .select()
        .eq('id', ctx.user_id)
        .single()
        .throwOnError()
    ).data;
    if (!applicant)
      throw new TRPCError({
        code: 'NOT_FOUND',
        message: 'Applicant not found',
      });
    return await next({
      ctx: {
        ...ctx,
        role,
        applicant,
      },
    });
  },
);
