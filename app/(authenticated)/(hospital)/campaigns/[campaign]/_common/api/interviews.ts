import { TRPCError } from '@trpc/server';
import { z } from 'zod';

import {
  type HospitalProcedure,
  hospitalProcedure,
  type ProcedureDefinition,
} from '@/server/api/trpc';
import { createPrivateClient } from '@/server/db';

const schema = z.object({
  id: z.string(),
});

const query = async ({ ctx, input }: HospitalProcedure<typeof schema>) => {
  const db = createPrivateClient();
  const data = (
    await db
      .from('interview')
      .select(
        'id, interview_stage, updated_at, applicant!interviews_user_id_fkey!inner(first_name, last_name, email, job_title)',
      )
      .eq('campaign_id', input.id)
      .eq('hospital_id', ctx.hospital.id)
  ).data;
  if (!data)
    throw new TRPCError({
      code: 'NOT_FOUND',
      message: 'Interviews not found',
    });
  return data.map(({ applicant, ...rest }) => ({ ...applicant, ...rest }));
};

export const interviews = hospitalProcedure.input(schema).query(query);

export type Interviews = ProcedureDefinition<typeof interviews>;

// id: string;
// first_name: string | null;
// last_name: string | null;
// email: string;
// interview_stage: 'not_started' |
//   'resume_submitted' |
//   'interview_inprogress' |
//   'interview_completed';
// updated_at: string | null;
// job_title: string | null;
