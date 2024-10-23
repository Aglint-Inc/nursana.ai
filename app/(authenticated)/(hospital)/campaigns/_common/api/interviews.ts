import 'server-only';

import { TRPCError } from '@trpc/server';

import { schema } from '@/campaigns/schema/interviews.schema';
import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const query = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const query = db
    .from('interview')
    .select(
      'id, interview_stage, updated_at, applicant!interviews_user_id_fkey!inner(first_name, last_name, email, terms_accepted)',
      { count: 'exact' },
    )
    .eq('hospital_id', ctx.hospital.id);

  if (input.interview_stage && input.interview_stage.length)
    query.in('interview_stage', input.interview_stage);

  if (input.updated_at && input.updated_at.length === 2) {
    query.gte('updated_at', input.updated_at[0]);
    query.lte('updated_at', input.updated_at[1]);
  }

  const { data, count } = await query;
  if (!data || !count)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Interviews not found',
    });
  return data.map(
    ({ applicant: { first_name, last_name, ...applicant }, ...rest }) => ({
      ...applicant,
      ...rest,
      name: `${first_name} ${last_name}`.trim(),
    }),
  );
};

export const interviews = hospitalProcedure.input(schema).query(query);

export type Interviews = ProcedureDefinition<typeof interviews>;
