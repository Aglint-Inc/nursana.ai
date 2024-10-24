import 'server-only';

import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { agencyUpdateSchema } from '@/supabase-types/zod-schema.types';

const schema = agencyUpdateSchema.pick({
  agency_name: true,
  contact_email: true,
  contact_number: true,
  contact_person: true,
  address: true,
});

const mutation = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  console.log(input);
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
