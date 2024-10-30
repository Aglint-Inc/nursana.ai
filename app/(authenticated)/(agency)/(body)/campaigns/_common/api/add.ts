import 'server-only';

import { createPrivateClient } from '@/db/client';
import { campaignInsertSchema } from '@/db/zod';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = campaignInsertSchema.pick({
  name: true,
  campaign_code: true,
  description: true,
  status: true,
  version_id: true,
});

const mutation = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const { agency } = ctx;
  const agency_id = agency.id;

  return (
    await db
      .from('campaign')
      .insert({ ...input, agency_id })
      .throwOnError()
  ).data;
};

export const add = agencyProcedure.input(schema).mutation(mutation);

export type Add = ProcedureDefinition<typeof add>;
