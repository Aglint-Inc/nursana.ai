/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import type { UseTRPCQueryResult } from '@trpc/react-query/dist/shared';
import type { ProcedureBuilder } from '@trpc/server/unstable-core-do-not-import';
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

export type Procedure<U extends ProcedureBuilderInput, T = unknown> =
  U extends ProcedureBuilder<
    infer TContext,
    any,
    infer TContextOverrides,
    any,
    any,
    any,
    any,
    any
  >
    ? {
        ctx: TContext & TContextOverrides;
        input: T extends ZodSchema ? TypeOf<T> : undefined;
      }
    : never;

type ProcedureBuilderInput = ProcedureBuilder<
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>;
