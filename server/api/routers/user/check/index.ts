import 'server-only';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';
import { userRowSchema } from '@/supabase-types/zod-schema.types';

export const schema = userRowSchema.pick({ email: true, user_role: true });

const mutation = async ({
  input: { email, user_role },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();
  if (user_role === 'applicant_user') {
    const applicant_user = (
      await db
        .from('applicant_user')
        .select('*, user!applicant_user_id_fkey!inner(*)')
        .eq('user.email', email)
        .single()
        .throwOnError()
    ).data;

    if (applicant_user) {
      return true;
    } else {
      return false;
    }
  } else {
    const agency_user = (
      await db
        .from('agency_user')
        .select('*, user!agency_user_id_fkey!inner(*)')
        .eq('user.email', email)
        .single()
        .throwOnError()
    ).data;

    if (agency_user) {
      return true;
    } else {
      return false;
    }
  }
};

export const userCheck = publicProcedure.input(schema).mutation(mutation);
