import 'server-only';

import { z } from 'zod';

import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { createPublicClient } from '@/server/db';

export const schema = z.object({
  address: z.string(),
  contact_email: z.string().email(),
  contact_number: z.string(),
  name: z.string(),
  user_id: z.string(),
});

const mutation = async ({
  input: { contact_email, name, address, contact_number, user_id },
}: PublicProcedure<typeof schema>) => {
  const db = createPublicClient();

  const resUser = (
    await db
      .from('user')
      .select('*, agency_user!agency_user_id_fkey!inner(*)')
      .eq('id', user_id)
      .single()
      .throwOnError()
  ).data;

  if (!resUser) throw new Error('User not found');

  await db
    .from('agency')
    .update({
      address,
      contact_email,
      contact_number,
      name,
    })
    .eq('id', resUser.agency_user.agency_id)
    .throwOnError();

  return { success: true };
};

export const updateAgency = publicProcedure.input(schema).mutation(mutation);
