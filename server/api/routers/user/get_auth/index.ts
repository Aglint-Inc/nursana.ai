/* eslint-disable no-console */

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id, role } }: PrivateProcedure) => {
  const db = createPrivateClient();
  const user = (
    await db
      .from('applicant')
      .select('*')
      .eq('id', user_id)
      .single()
      .throwOnError()
  ).data!;

  return { ...user, role };
};

export const getAuth = privateProcedure.query(query);
