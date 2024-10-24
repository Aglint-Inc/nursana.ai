import 'server-only';

import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  created_by: z.string(),
  contact_email: z.string().email(),
  agency_name: z.string(),
  address: z.string(),
  contact_person: z.string(),
  contact_number: z.string(),
  user_id: z.string(),
});

const mutation = async ({
  input: {
    created_by,
    contact_email,
    agency_name,
    address,
    contact_person,
    contact_number,
    user_id,
  },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();

  const resUser = (
    await db
      .from('user')
      .select('*')
      .eq('user_id', user_id)
      .single()
      .throwOnError()
  ).data;

  if (!resUser) throw new Error('User not found');

  await db
    .from('agency')
    .update({
      agency_name,
      address,
      contact_email,
      contact_person,
      contact_number,
      created_by,
    })
    .eq('id', resUser.agency_id)
    .throwOnError();

  return { success: true };
};

export const updateAgency = publicProcedure.input(schema).mutation(mutation);
