import 'server-only';

import { createPrivateClient } from '@/db/client';
import { agencyUpdateSchema } from '@/db/zod';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

const schema = agencyUpdateSchema.pick({
  name: true,
  contact_email: true,
  contact_number: true,
  address: true,
});

const mutation = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  return (
    await db
      .from('agency')
      .update(input)
      .eq('id', ctx.agency.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = agencyProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
