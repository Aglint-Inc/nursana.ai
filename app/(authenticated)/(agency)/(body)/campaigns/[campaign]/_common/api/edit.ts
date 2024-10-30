import 'server-only';

import { createPrivateClient } from '@/db/client';
import { campaignUpdateSchema } from '@/db/zod';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = campaignUpdateSchema.pick({
  id: true,
  campaign_code: true,
  description: true,
  name: true,
  status: true,
  version_id: true,
});

const mutation = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('campaign')
      .update(input)
      .eq('id', input.id!)
      .eq('agency_id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = agencyProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
