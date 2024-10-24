import 'server-only'; /* eslint-disable no-console */

import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  email: z.string().email(),
  campaign_id: z.string(),
});

const mutation = async ({
  input: { email, campaign_id },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  const applicant_user = (
    await db
      .from('applicant_user')
      .select('*, user!applicant_user_id_fkey!inner(*)')
      .eq('email', email)
      .single()
      .throwOnError()
  ).data!;

  const resume = applicant_user
    ? (
        await db
          .from('resume')
          .select('*')
          .eq('campaign_id', campaign_id)
          .eq('user_id', applicant_user.user.id)
          .throwOnError()
      ).data
    : null;

  const { user, ...rest } = applicant_user;

  return {
    user: applicant_user ? { ...rest, ...user } : null,
    resume: resume ? resume[0] : null,
  };
};

export const userCheck = publicProcedure.input(schema).mutation(mutation);
