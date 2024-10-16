import { signOutAction } from "app/actions";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";

import { createClient } from "@/utils/supabase/server";

import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

export default async function AuthButton() {
  const {
    data: { user },
  } = await createClient().auth.getUser();

  const isAnonymous = user?.is_anonymous;

  return user && !isAnonymous ? (
    <div className="flex items-center gap-4">
      Hey, User First Name!
      <Badge>
        If user has an incomplete interview, and in pubilc pages i.e not in
        dashbaord. show this badge with CTA to proceed and complete interview
        and redirect to interview page.
      </Badge>
      <form action={signOutAction}>
        <Button type="submit" variant={"outline"}>
          Visit Dashboard <ArrowRightIcon />
        </Button>
      </form>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant={"outline"}>
        <Link href="/sign-in">Sign in</Link>
      </Button>
      <Button asChild size="sm" variant={"default"}>
        <Link href="/sign-up">Sign up</Link>
      </Button>
    </div>
  );
}
