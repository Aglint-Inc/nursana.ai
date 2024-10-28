import 'server-only';

import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

import { templateAddSchema } from '../template.schema';

const mutation = async ({
  ctx,
  input,
}: AgencyProcedure<typeof templateAddSchema>) => {
  const db = createPrivateClient();
  const { agency } = ctx;
  const agency_id = agency.id;
  const { id: template_id } = (
    await db
      .from('template')
      .insert({ ...input.template, agency_id })
      .select('id')
      .single()
      .throwOnError()
  ).data!;

  return (
    await db
      .from('version')
      .insert({ ...input.version, agency_id, template_id })
      .throwOnError()
  ).data;
};

export const add = agencyProcedure.input(templateAddSchema).mutation(mutation);

export type Add = ProcedureDefinition<typeof add>;
