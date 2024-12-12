import 'server-only';

import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import { createPrivateClient } from '@/db/client';
import {
  type AgencyProcedure,
  agencyProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';

import { schema as interviewSchem } from '../schema/interviews.read.schema';

const schema = interviewSchem.merge(
  z.object({
    campaign_id: z.string().optional(),
  }),
);

export const query = async ({ ctx, input }: AgencyProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const query = db
    .from('interview')
    .select(
      'id, interview_stage, updated_at, version!interview_version_id_fkey!inner(template!version_template_id_fkey!inner(id, name)), campaign!interview_campaign_id_fkey!inner(campaign_code), applicant_user!interview_applicant_id_fkey!inner(terms_accepted, user!applicant_user_id_fkey!inner(first_name, last_name, email))',
      { count: 'exact' },
    )
    .eq('agency_id', ctx.agency.id)
    .order('updated_at', {
      ascending: false,
    });

  if (input.campaign_id) query.eq('campaign_id', input.campaign_id);

  const { data } = await query;

  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Interviews not found',
    });

  return data.map(
    ({
      campaign: { campaign_code },
      version: { template },
      applicant_user: {
        user: { first_name, last_name, ...user },
        ...applicant_user
      },
      ...rest
    }) => ({
      ...user,
      ...applicant_user,
      ...rest,
      campaign_code,
      template,
      name: `${first_name} ${last_name}`.trim(),
    }),
  );
};

export const read = agencyProcedure.input(schema).query(query);

export type Read = ProcedureDefinition<typeof read>;
