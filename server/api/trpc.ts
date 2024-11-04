import type { UseTRPCQueryResult } from '@trpc/react-query/dist/shared';
import type { inferProcedureBuilderResolverOptions } from '@trpc/server';
import type { AnyProcedureBuilder } from '@trpc/server/unstable-core-do-not-import';
import { type TypeOf, type ZodSchema } from 'zod';

import { t } from './init';
import { agency, applicant, auth, timing } from './middleware';

export const createTRPCContext = async (opts: { headers: Headers }) => {
  return opts;
};

export const createCallerFactory = t.createCallerFactory;

export const createTRPCRouter = t.router;

export const publicProcedure = t.procedure.use(timing);
export type PublicProcedure<T = unknown> = Procedure<typeof publicProcedure, T>;

export const privateProcedure = t.procedure.use(auth);
export type PrivateProcedure<T = unknown> = Procedure<
  typeof privateProcedure,
  T
>;

export const agencyProcedure = t.procedure.use(agency);
export type AgencyProcedure<T = unknown> = Procedure<typeof agencyProcedure, T>;

export const applicantProcedure = t.procedure.use(applicant);
export type ApplicantProcedure<T = unknown> = Procedure<
  typeof applicantProcedure,
  T
>;

type Definition = { _def: { $types: any } };

export type ProcedureDefinition<T extends Definition> = Pick<
  T['_def']['$types'],
  'input' | 'output'
>;

export type ProcedureQuery<T extends ProcedureDefinition<Definition>> =
  UseTRPCQueryResult<T['output'], any>;

export type Procedure<T extends AnyProcedureBuilder, U = undefined> =
  inferProcedureBuilderResolverOptions<T> extends infer R
    ? U extends ZodSchema
      ? R & { input: TypeOf<U> }
      : R
    : never;
