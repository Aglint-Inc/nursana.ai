import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export const updateSession = async (request: NextRequest) => {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) =>
              request.cookies.set(name, value),
            );
            response = NextResponse.next({
              request,
            });
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options),
            );
          },
        }
      }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();
  
  const isProtectedRoute = request.nextUrl.pathname.startsWith("/protected");

  if (!session) {
    const { data, error: signInError } = await supabase.auth.signInAnonymously();
    
    if (signInError) {
      return response;
    }
    
    if (data.session) {
      response.headers.set('x-user-id', data.session.user.id);
    }
  } else {
    response.headers.set('x-user-id', session.user.id);

    if (!session.user.is_anonymous) {
      // If user is authenticated and not anonymous, redirect to protected route
      if (!request.nextUrl.pathname.startsWith("/protected")) {
        return NextResponse.redirect(new URL("/protected", request.url));
      }
    }
  }

  // Check if the user is trying to access a protected route
  if (isProtectedRoute) {
    const isNonAnonymousUser = session && !session.user.is_anonymous
    if (!isNonAnonymousUser) {
      // Redirect to login if the user is not a non-anonymous user
      return NextResponse.redirect(new URL("/login", request.url))
    }
  }

  // Pass campaign_code to the page if it exists in the URL parameters
  const campaignCode = request.nextUrl.searchParams.get('campaign_code');
  if (campaignCode) {
    response.headers.set('x-campaign-code', campaignCode);
  }

  return response;
};
