import { HospitalProcedure, hospitalProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { TRPCError } from '@trpc/server';

const query = async ({ ctx }: HospitalProcedure) => {
  const db = createPrivateClient();
  const campaigns = (
    await db
      .from('campaign')
      .select()
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
