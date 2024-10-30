import 'server-only';

/* eslint-disable no-console */
import { z } from 'zod';

import { createPrivateClient } from '@/db/client';
import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

export const worldSchema = z.object({ worldId: z.string().uuid() });

const mutation = ({
  input: { worldId },
}: PrivateProcedure<typeof worldSchema>) => {
  const db = createPrivateClient();
  if (db) {
    console.log(`World from the db: ${worldId}`);
  }
  console.log(`World from the db: ${worldId}`);
  return { worldId };
};

export const world = privateProcedure.input(worldSchema).mutation(mutation);
