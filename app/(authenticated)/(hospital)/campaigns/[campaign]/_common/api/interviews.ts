import 'server-only';

import { TRPCError } from '@trpc/server';

import { inputSchema as schema } from '@/campaign/schema/columnFilterSchema';
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
      'id, interview_stage, updated_at, applicant!interviews_user_id_fkey!inner(first_name, last_name, email, job_title, expected_salary, terms_accepted)',
    )
    .eq('campaign_id', input.id)
    .eq('hospital_id', ctx.hospital.id)
    .limit(input.size)
    .range(input.start, input.start + input.size);

  if (input.email) query.eq('applicant.email', input.email);

  if (input.job_title) query.eq('applicant.job_title', input.job_title);

  if (input.interview_stage && input.interview_stage.length)
    query.in('interview_stage', input.interview_stage);

  if (input.updated_at && input.updated_at.length === 2) {
    query.gte('updated_at', input.updated_at[0]);
    query.lte('updated_at', input.updated_at[1]);
  }

  const { data } = await query;
  if (!data)
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
