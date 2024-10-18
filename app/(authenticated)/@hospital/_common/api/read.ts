import { type HospitalProcedure, hospitalProcedure } from '@/server/api/trpc';

const query = ({ ctx }: HospitalProcedure) => ctx.hospital;

export const read = hospitalProcedure.query(query);
