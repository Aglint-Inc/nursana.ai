import { type NextRequest, NextResponse } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

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

  '^/auth/',
  'campaign',
  '/api/trpc',
  '/tenant/sign-up',
  '/api/backup-interview-data',
];

const PUBLIC_ROUTES_REGEX = new RegExp(PUBLIC_ROUTES.join('|'));

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  console.log(pathname);

  // Check if the current path matches any public route pattern
  if (PUBLIC_ROUTES_REGEX.test(pathname)) {
    return NextResponse.next();
  }

  return await updateSession(request);
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
