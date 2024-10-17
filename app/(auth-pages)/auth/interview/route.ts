import { NextResponse } from 'next/server';

import { createClient } from '@/utils/supabase/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const { origin, searchParams } = new URL(request.url);
  const code = searchParams.get('code');
  const interview_id = searchParams.get('id');
  console.log(code, interview_id);

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      return NextResponse.redirect(
        `${origin}/auth/sign-in?error=${error.message}`,
      );
    }

    if (interview_id) {
      return NextResponse.redirect(
        `${origin}/interview/${interview_id}/start-interview`,
      );
    } else {
      return NextResponse.redirect(
        `${origin}/auth/sign-in?error=no_interview_id`,
      );
    }
  }
  return NextResponse.redirect(`${origin}/auth/sign-in?error=invalid_code`);
}
