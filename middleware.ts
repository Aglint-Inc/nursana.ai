/* eslint-disable security/detect-non-literal-regexp */
import { jwtDecode, type JwtPayload } from 'jwt-decode';
import { type NextRequest, NextResponse } from 'next/server';

import { type Database } from '@/supabase-types/database.types';

import { createPrivateClient } from './server/db';

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

const PUBLIC_API = [
  'trpc',
  'score_resume',
  'score_call',
  'backup-interview-data',
].map((api) => `^/api/${api}(/.*)?$`);

const PUBLIC_ROUTES = new RegExp(
  [
    '^/$',
    '^/forgot-password$',
    '^/reset-password$',
    '^/tenant/sign-up$',
    '^/openAiRealTime$',
    '^/tenant/sign-up$',
    '^/campaign(/.*)?$',
    '^/auth(?!/sign-in$)',
    '^/ui(/.*)?$',
    '^/terms$',
    '^/privacy-policy$',
    ...PUBLIC_API,
  ].join('|'),
);

const AGENCY_ROUTES = new RegExp(
  ['^/campaigns(/.*)?$', '^/interviews/.+', '^/templates(/.*)?$'].join('|'),
);

const AGENCY_DEFAULT = '/campaigns';

const APPLICANT_ROUTES = new RegExp(
  [
    '/dashboard',
    '/interview-feedback',
    '/interview-transcript',
    '/jobs',
    '/resume-review',
    '^/profile(/.*)?$',
    '^/interview(/.*)?$',
  ].join('|'),
);

const APPLICANT_DEFAULT = '/dashboard';

const SIGN_IN = '/auth/sign-in';

export const middleware = async (request: NextRequest) => {
  return (
    (await preflightCheck(request)) ??
    (await publicPageCheck(request)) ??
    (await sessionCheck(request)) ??
    NextResponse.redirect(new URL(SIGN_IN, request.nextUrl))
  );
};

const preflightCheck: MiddlewareType = async (request) => {
  const isPreflight = request.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders: HeadersInit = {
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };

    const origin = request.headers.get('origin') ?? '';

    const isAllowedOrigin = origin.startsWith('http://localhost');

    if (isAllowedOrigin)
      preflightHeaders['Access-Control-Allow-Origin'] = origin;

    return NextResponse.json({}, { headers: preflightHeaders });
  }
};

const publicPageCheck: MiddlewareType = async (request) => {
  const { pathname } = request.nextUrl;

  if (PUBLIC_ROUTES.test(pathname)) return NextResponse.next();
};

const sessionCheck: MiddlewareType = async (request) => {
  const { pathname } = request.nextUrl;

  const role = await getRole();

  if (!role && pathname === SIGN_IN) return NextResponse.next();

  if (role === 'agency_user') {
    if (pathname === SIGN_IN || !AGENCY_ROUTES.test(pathname))
      return NextResponse.redirect(new URL(AGENCY_DEFAULT, request.nextUrl));
    return NextResponse.next();
  }

  if (role === 'applicant_user') {
    if (pathname === SIGN_IN || !APPLICANT_ROUTES.test(pathname))
      return NextResponse.redirect(new URL(APPLICANT_DEFAULT, request.nextUrl));
    return NextResponse.next();
  }
};

const getRole = async () => {
  const { data } = await createPrivateClient().auth.getSession();

  if (!data.session?.access_token) return null;

  const jwt = jwtDecode(data.session.access_token) as JwtPayload & {
    user_role: Database['public']['Enums']['user_role'];
  };

  return jwt?.user_role ?? null;
};

type MiddlewareType<T extends NextRequest = NextRequest> = (
  _req: T,
) => Promise<NextResponse | undefined>;
