/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */
import { initTRPC, TRPCError } from "@trpc/server";
import type { ProcedureBuilder } from "@trpc/server/unstable-core-do-not-import";
import superjson from "superjson";
import { type TypeOf, ZodError, type ZodSchema } from "zod";

import { createPrivateClient } from "../db";

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 *
 * This helper generates the "internals" for a tRPC context. The API handler and RSC clients each
 * wrap this and provides the required context.
 *
 * @see https://trpc.io/docs/server/context
 */
export const createTRPCContext = async (opts: { headers: Headers }) => {
  return opts;
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer. We also parse
 * ZodErrors so that you get typesafety on the frontend if your procedure fails due to validation
 * errors on the backend.
 */
const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    };
  },
});

/**
 * Create a server-side caller.
 *
 * @see https://trpc.io/docs/server/server-side-calls
 */
export const createCallerFactory = t.createCallerFactory;

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Middleware for timing procedure execution and adding an artificial delay in development.
 *
 * You can remove this if you don't like it, but it can help catch unwanted waterfalls by simulating
 * network latency that would occur in production but not in local development.
 */
const timingMiddleware = t.middleware(async ({ next, path: _path }) => {
  const _start = Date.now();

  // if (t._config.isDev) {
  //   const waitMs = Math.floor(Math.random() * 400) + 1000;
  //   await new Promise((resolve) => setTimeout(resolve, waitMs));
  // }

  const result = await next();

  const _end = Date.now();
  if (process.env.NEXT_PUBLIC_HOST_NAME === "http://localhost:3000") {
    // eslint-disable-next-line no-console
    // console.log(`[TRPC] ${path} took ${end - start}ms to execute`);
  }
  return result;
});

/**
 *  @see https://stackoverflow.com/questions/3297048/403-forbidden-vs-401-unauthorized-http-responses
 */
const authMiddleware = t.middleware(async ({ next, ctx }) => {
  const db = createPrivateClient();

  let user_id: string | null = null;

  if (process.env.NODE_ENV === "development")
    user_id = (await db.auth.getSession())?.data?.session?.user?.id ?? null;
  else user_id = (await db.auth.getUser()).data.user?.id ?? null;

  if (!user_id)
    throw new TRPCError({
      code: "UNAUTHORIZED",
      message: "User unauthenticated",
    });

  return await next({
    ctx: {
      ...ctx,
      user_id,
    },
  });
});

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */

export const publicProcedure = t.procedure.use(timingMiddleware);
export type PublicProcedure<T = unknown> = Procedure<typeof publicProcedure, T>;

export const dbProcedure = publicProcedure;
export type DBProcedure<T = unknown> = Procedure<typeof dbProcedure, T>;

/**
 * Private (authenticated) procedure
 *
 * This procedure is intended for queries and mutations that require the user to be authenticated.
 * It ensures that the user is logged in and authorized before accessing the API. User session data + permissions
 * are always accessible through the middleware chain, and you can safely assume the presence of an authenticated user.
 */

export const privateProcedure = publicProcedure.use(authMiddleware);
export type PrivateProcedure<T = unknown> = Procedure<
  typeof privateProcedure,
  T
>;

type Procedure<
  U extends ProcedureBuilder<any, any, any, any, any, any, any, any>,
  T = unknown
> = T extends ZodSchema
  ? U extends ProcedureBuilder<
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
        input: TypeOf<T>;
      }
    : never
  : U extends ProcedureBuilder<
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
      input: undefined;
    }
  : never;

export type RequiredPayload<T extends Record<any, any>[] | Record<any, any>> =
  T extends Record<any, any>[] ? Required<T[number]>[] : Required<T>;