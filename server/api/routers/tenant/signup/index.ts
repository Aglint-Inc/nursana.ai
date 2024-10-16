/* eslint-disable no-console */
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
  await db
    .from('tenant')
    .insert({
      user_id: userId,
      email,
      first_name,
      last_name,
    })
    .throwOnError();

  await db
    .from('roles')
    .insert({
      user_id: userId,
      role: 'hospital',
    })
    .throwOnError();

  return { success: true };
};

export const tenantSignup = publicProcedure.input(schema).mutation(mutation);