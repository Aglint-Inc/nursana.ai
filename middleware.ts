import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const origin = req.headers.get('origin') ?? '';
  const isAllowedOrigin = origin.startsWith('http://localhost');

  const isPreflight = req.method === 'OPTIONS';

  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    };
    return NextResponse.json({}, { headers: preflightHeaders });
  }

  // Check if the current path matches any public route pattern
  if (PUBLIC_ROUTES_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  return await updateSession(req);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images - .svg, .png, .jpg, .jpeg, .gif, .webp
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};

// Define public routes and folders
const PUBLIC_ROUTES = [
  // Exact matches
  '^/$', // Homepage
  '^/login$',
  '^/signup$',
  '^/about$',
  '^/contact$',
  // Folders (everything under these paths)
  // Starts with
  'score_resume',
  '^/auth/',
  '/campaign',
  '/api/trpc',
  '/api/score_resume',
  '/api/score_call',
  '/tenant/sign-up',
  '/api/backup-interview-data',
  '/auth/confirm',
  '/auth/interview',
  '/openAiRealTime',
];

const PUBLIC_ROUTES_REGEX = new RegExp(PUBLIC_ROUTES.join('|'));
