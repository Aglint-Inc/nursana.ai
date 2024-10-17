/* eslint-disable no-console */
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  email: z.string().email(),
  role: z.enum(['nurse', 'company']),
});

const mutation = async ({
  input: { email, role },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  if (role === 'nurse') {
    const user = (
      await db
        .from('applicant')
        .select('*')
        .eq('email', email)
        .single()
        .throwOnError()
    ).data;

    if (user) {
      return true;
    } else {
      return false;
    }
  } else {
    const tenant = (
      await db
        .from('user')
        .select('*')
        .eq('email', email)
        .single()
        .throwOnError()
    ).data;

    if (tenant) {
      return true;
    } else {
      return false;
    }
  }
};

export const userCheck = publicProcedure.input(schema).mutation(mutation);
