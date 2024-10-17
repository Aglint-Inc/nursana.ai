import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const interview_id = requestUrl.searchParams.get('interview_id');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
    if (interview_id) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/interview/${interview_id}/start-interview`,
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_SITE_URL}/dashboard`,
      );
    }
  } else {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/auth/sign-in?error=invalid_code`,
    );
  }
}
