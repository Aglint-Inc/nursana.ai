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
  const user = (
    await db.from('applicant').select('*').eq('email', email).throwOnError()
  ).data;

  const resume = user?.length
    ? (
        await db
          .from('resume')
          .select('*')
          .eq('campaign_id', campaign_id)
          .eq('user_id', user[0].id)
          .throwOnError()
      ).data
    : null;

  return { user: user ? user[0] : null, resume: resume ? resume[0] : null };
};

export const userCheck = publicProcedure.input(schema).mutation(mutation);
