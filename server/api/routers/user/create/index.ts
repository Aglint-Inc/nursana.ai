import 'server-only';

/* eslint-disable no-console */
import { z } from 'zod';

import { nerseTitlesSchema } from '@/db/zod';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  email: z.string().email(),
  first_name: z.string(),
  last_name: z.string().optional(),
  job_title: nerseTitlesSchema,
});

const mutation = async ({
  input: { email, first_name, last_name, job_title },
}: PublicProcedure<typeof schema>) => {
  const supabase = createPublicClient();

  const res = await supabase.auth.admin.createUser({
    email: email,
    password: 'Welcome@123',
  });

  const userId = res.data?.user?.id;

  if (!userId) throw new Error('User not created');

  await supabase
    .from('user')
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
      user_role: 'applicant_user',
    })
    .throwOnError();

  await supabase
    .from('applicant_user')
    .insert({
      id: userId,
      job_title,
    })
    .throwOnError();

  return res;
};

export const createUser = publicProcedure.input(schema).mutation(mutation);
