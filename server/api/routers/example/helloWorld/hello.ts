import 'server-only';

import { z } from 'zod';

import { createPrivateClient } from '@/db/client';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const helloSchema = z.object({ helloId: z.string().uuid() });

const query = ({
  input: { helloId },
}: PrivateProcedure<typeof helloSchema>) => {
  const db = createPrivateClient();
  if (db) {
    return `Hello from the db: ${helloId}`;
  }
  return `Hello: ${helloId}`;
};

export const hello = privateProcedure.input(helloSchema).query(query);
