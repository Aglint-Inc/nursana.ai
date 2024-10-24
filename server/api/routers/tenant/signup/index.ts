import 'server-only'; /* eslint-disable no-console */

import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  userId: z.string(),
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string().optional(),
});

const mutation = async ({
  input: { userId, email, first_name, last_name },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();

  const res = (
    await db
      .from('agency')
      .insert({
        agency_name: '',
      })
      .select('id')
      .single()
      .throwOnError()
  ).data;

  if (!res?.id) throw new Error('Failed to create agency');

  await db
    .from('user')
    .insert({
      user_id: userId,
      email,
      first_name,
      last_name,
      agency_id: res.id,
    })
    .throwOnError();

  await db
    .from('role')
    .insert({
      user_id: userId,
      role: 'user',
    })
    .throwOnError();

  return { success: true, agency_id: res.id };
};

export const tenantSignup = publicProcedure.input(schema).mutation(mutation);
