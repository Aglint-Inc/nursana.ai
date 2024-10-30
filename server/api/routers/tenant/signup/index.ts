import 'server-only'; /* eslint-disable no-console */

import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

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
        name: '',
      })
      .select('id')
      .single()
      .throwOnError()
  ).data;

  if (!res?.id) throw new Error('Failed to create agency');

  await db
    .from('user')
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
      user_role: 'agency_user',
    })
    .throwOnError();

  await db
    .from('agency_user')
    .insert({
      id: userId,
      agency_id: res.id,
    })
    .throwOnError();

  return { success: true, agency_id: res.id };
};

export const tenantSignup = publicProcedure.input(schema).mutation(mutation);
