"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

export default function CheckEmail() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <h1 className="text-2xl font-bold mb-4">Check Your Email</h1>
      <p className="text-center mb-6">
        {`We've sent a magic link to your email address. Please check your inbox
        and click on the link to sign in.`}
      </p>
      <p className="text-sm text-muted-foreground mb-8">
        {`If you don't see the email, check your spam folder.`}
      </p>
      <Button onClick={() => router.push("/")}>Back to Home Page</Button>
    </div>
  );
}
