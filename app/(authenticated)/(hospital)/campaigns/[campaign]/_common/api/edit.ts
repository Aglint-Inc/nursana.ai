import 'server-only';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { campaignUpdateSchema } from '@/supabase-types/zod-schema.types';

const schema = campaignUpdateSchema.pick({
  id: true,
  campaign_code: true,
  description: true,
  name: true,
});

const mutation = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('campaign')
      .update(input)
      .eq('id', input.id!)
      .eq('hospital_id', ctx.hospital.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = hospitalProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
