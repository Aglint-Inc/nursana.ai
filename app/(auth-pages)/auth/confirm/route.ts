import { NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function GET(request: Request) {
  // The `/auth/callback` route is required for the server-side auth flow implemented
  // by the SSR package. It exchanges an auth code for the user's session.
  // https://supabase.com/docs/guides/auth/server-side/nextjs
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const interview_id = requestUrl.searchParams.get("interview_id");
  const origin = requestUrl.origin;

  console.log(code, interview_id, origin);

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
    if (interview_id) {
      return NextResponse.redirect(
        `${origin}/interview/${interview_id}/start-interview`
      );
    } else {
      return NextResponse.redirect(`${origin}/dashboard`);
    }
  } else {
    return NextResponse.redirect(`${origin}/user/sign-in?error=invalid_code`);
  }
}
