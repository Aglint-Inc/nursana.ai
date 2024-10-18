import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { type HospitalProcedure, hospitalProcedure } from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  id: z.string(),
});

const query = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const campaign = (
    await db
      .from('campaign')
      .select()
      .eq('id', input.id)
      .eq('hospital_id', ctx.hospital.id)
      .single()
      .throwOnError()
  ).data;
  if (!campaign)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Campaign not found',
    });
  return campaign;
};

export const read = hospitalProcedure.input(schema).query(query);
