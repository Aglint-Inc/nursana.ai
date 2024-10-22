import 'server-only';

import { type HospitalProcedure, hospitalProcedure } from '@/server/api/trpc';

const query = ({ ctx }: HospitalProcedure) => ctx.user;

export const user = hospitalProcedure.query(query);
