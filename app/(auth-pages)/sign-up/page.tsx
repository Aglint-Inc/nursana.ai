"use client";

import { signUpAction } from "@/app/actions";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function Signup() {
  const [message, setMessage] = useState<Message | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await signUpAction(formData);
    console.log(result);
    if ("error" in result) {
      setMessage({ type: "error", text: result.error });
    }
    // Handle successful sign-up if needed
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col  mx-auto min-w-80 mt-36"
      >
        <h1 className="text-2xl font-medium">Sign up</h1>
        <p className="text-sm text text-foreground">
          Already have an account?{" "}
          <Link className="text-primary font-medium underline" href="/sign-in">
            Sign in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            name="password"
            placeholder="Your password"
            minLength={6}
            required
          />
          <SubmitButton pendingText="Signing up...">Sign up</SubmitButton>
          {message && <FormMessage message={message} />}
        </div>
      </form>
    </>
  );
}
