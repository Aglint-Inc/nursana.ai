import 'server-only';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';
import { hospitalUpdateSchema } from '@/supabase-types/zod-schema.types';

const schema = hospitalUpdateSchema.pick({
  hospital_name: true,
  contact_email: true,
  contact_number: true,
  contact_person: true,
  address: true,
});

const mutation = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  console.log(input);
  const db = createPrivateClient();
  return (
    await db
      .from('hospital')
      .update(input)
      .eq('id', ctx.hospital.id)
      .single()
      .throwOnError()
  ).data;
};

export const edit = hospitalProcedure.input(schema).mutation(mutation);

export type Edit = ProcedureDefinition<typeof edit>;
