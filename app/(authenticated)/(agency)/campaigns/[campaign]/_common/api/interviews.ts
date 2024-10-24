import 'server-only';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { schema as interviewsSchema } from '@/campaigns/schema/interviews.schema';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

export const schema = interviewsSchema.merge(
  z.object({
    id: z.string(),
  }),
);

const query = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const query = db
    .from('interview')
    .select(
      'id, interview_stage, updated_at, applicant_user!interview_applicant_id_fkey!inner(applicant_id:id, terms_accepted, user!applicant_user_id_fkey!inner(first_name, last_name, email))',
      { count: 'exact' },
    )
    .eq('campaign_id', input.id)
    .eq('agency_id', ctx.agency.id);

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
    ({
      applicant_user: {
        user: { first_name, last_name, ...user },
        ...applicant_user
      },
      ...rest
    }) => ({
      ...user,
      ...applicant_user,
      ...rest,
      name: `${first_name} ${last_name}`.trim(),
    }),
  );
};

export const interviews = agencyProcedure.input(schema).query(query);

export type Interviews = ProcedureDefinition<typeof interviews>;
