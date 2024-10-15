import { ShieldAlert } from "lucide-react";
import Link from "next/link";
import React from "react";

import { Button } from "./ui/button";

function AuthenticationError() {
  return (
    <div className="h-[100vh] w-[100vw] flex flex-col items-center justify-center gap-4">
        <ShieldAlert size={80} className="text-red-500" strokeWidth={1.2} />
      <p>Authentication error. Please try signing in again.</p>
      <Link href={"/sign-in"}>
        <Button>Sign In</Button>
      </Link>
    </div>
  );
}

export default AuthenticationError;
