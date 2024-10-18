/* eslint-disable no-console */

import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx: { user_id, role } }: PrivateProcedure) => {
  const db = createPrivateClient();
  console.log('user_id', user_id);

  const tenant = (
    await db
      .from('user')
      .select('*')
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;

  if (!tenant || tenant?.hospital_id === null) {
    throw new Error('Tenant not found or not associated with a hospital');
  }

  const hospital = (
    await db
      .from('hospital')
      .select('*')
      .eq('id', tenant?.hospital_id)
      .single()
      .throwOnError()
  ).data!;

  return {
    tenant,
    hospital,
    role,
  };
};

export const tenantHospital = privateProcedure.query(query);
