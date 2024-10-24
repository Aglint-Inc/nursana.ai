import 'server-only';

import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';

const query = ({ ctx }: AgencyProcedure) => ctx.user;

export const user = agencyProcedure.query(query);
