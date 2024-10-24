import 'server-only';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { templateAddSchema } from '../schema/template.schema';

const mutation = async ({
  ctx,
  input,
}: HospitalProcedure<typeof templateAddSchema>) => {
  const db = createPrivateClient();
  const { hospital } = ctx;
  const hospital_id = hospital.id;
  const { id: template_id } = (
    await db
      .from('template')
      .insert({ ...input.template, hospital_id })
      .select('id')
      .single()
      .throwOnError()
  ).data!;

  return (
    await db
      .from('version')
      .insert({ ...input.version, hospital_id, template_id })
      .throwOnError()
  ).data;
};

export const add = hospitalProcedure
  .input(templateAddSchema)
  .mutation(mutation);

export type Add = ProcedureDefinition<typeof add>;
