import { type PrivateProcedure, privateProcedure } from '@/server/api/trpc';

const query = ({ ctx }: PrivateProcedure) => ctx.role;

export const role = privateProcedure.query(query);
