import { TRPCError } from '@trpc/server';
import { jwtDecode, type JwtPayload } from 'jwt-decode';

import { createPrivateClient } from '@/db/client';
import type { DBEnums } from '@/db/types';

import { timing } from './timing';

/**
 *  @see https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
 */
export const auth = timing.unstable_pipe(async ({ next, ctx }) => {
  const db = createPrivateClient();

  let user_id: string | null = null;

  let role: DBEnums<'user_role'> | null = null;

  const { session } = (await db.auth.getSession()).data;

  if (!session)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User unauthenticated',
    });

  const jwt = jwtDecode(session.access_token) as JwtPayload & {
    user_role: DBEnums<'user_role'>;
  };
  role = jwt?.user_role ?? null;

  if (process.env.NODE_ENV === 'development')
    user_id = session.user?.id ?? null;
  else {
    const { user } = (await db.auth.getUser()).data;
    user_id = user?.id ?? null;
  }

  if (!user_id || !role)
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User unauthenticated',
    });

  return await next({
    ctx: {
      ...ctx,
      user_id,
      role,
    },
  });
});
