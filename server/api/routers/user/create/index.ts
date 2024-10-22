import 'server-only';

/* eslint-disable no-console */
import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { appRoleSchema } from '@/supabase-types/zod-schema.types';

export const schema = z.object({
  email: z.string().email(),
  role: appRoleSchema,
  first_name: z.string(),
  last_name: z.string().optional(),
  job_title: z.string(),
});

const mutation = async ({
  input: { email, role, first_name, last_name, job_title },
}: PublicProcedure<typeof schema>) => {
  const supabase = createPublicClient();

  const res = await supabase.auth.admin.createUser({
    email: email,
    password: 'Welcome@123',
  });

  const userId = res.data?.user?.id;

  if (!userId) throw new Error('User not created');

  await supabase
    .from('applicant')
    .insert({
      id: userId,
      email,
      first_name,
      last_name,
      job_title,
    })
    .throwOnError();

  await supabase
    .from('role')
    .insert({
      user_id: userId,
      role: role,
    })
    .throwOnError();

  return res;
};

export const createUser = publicProcedure.input(schema).mutation(mutation);
