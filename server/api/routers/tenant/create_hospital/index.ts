import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  created_by: z.string(),
  contact_email: z.string().email(),
  hospital_name: z.string(),
  address: z.string(),
  contact_person: z.string(),
  contact_number: z.string(),
});

const mutation = async ({
  input: {
    created_by,
    contact_email,
    hospital_name,
    address,
    contact_person,
    contact_number,
  },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();

  const res = (
    await db
      .from('hospitals')
      .insert({
        hospital_name,
        address,
        contact_email,
        contact_person,
        contact_number,
        created_by,
      })
      .select('id')
      .single()
      .throwOnError()
  ).data;

  if (!res) throw new Error('Hospital not created');

  await db
    .from('tenant')
    .update({
      hospital_id: res.id,
    })
    .eq('user_id', created_by)
    .throwOnError();

  return { success: true };
};

export const createHospital = publicProcedure.input(schema).mutation(mutation);
