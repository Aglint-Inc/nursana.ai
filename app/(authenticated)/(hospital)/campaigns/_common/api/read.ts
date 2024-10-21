import { TRPCError } from '@trpc/server';

import { type HospitalProcedure, hospitalProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx }: HospitalProcedure) => {
  const db = createPrivateClient();
  const campaigns = (
    await db
      .from('campaign')
      .select('id, name, description, campaign_code, status')
      .eq('hospital_id', ctx.hospital.id)
      .throwOnError()
  ).data;
  if (!campaigns)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Campaigns not founc',
    });
  return campaigns;
};

export const read = hospitalProcedure.query(query);
