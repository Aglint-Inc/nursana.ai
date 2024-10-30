import 'server-only'; /* eslint-disable no-console */

import { z } from 'zod';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';

export const barSchema = z.object({ barId: z.string().uuid() });

const mutation = ({ input: { barId } }: PublicProcedure<typeof barSchema>) => {
  const adminDb = createPublicClient();
  if (adminDb) {
    console.log(`Bar from the adminDb: ${barId}`);
  }
  console.log(`Bar from the adminDb: ${barId}`);
};

export const bar = publicProcedure.input(barSchema).mutation(mutation);
