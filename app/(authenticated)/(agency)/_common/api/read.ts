import 'server-only';

import { type AgencyProcedure, agencyProcedure } from '@/server/api/trpc';

const query = ({ ctx }: AgencyProcedure) => ctx.agency;

export const read = agencyProcedure.query(query);
