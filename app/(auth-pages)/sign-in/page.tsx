"use client";

import Link from "next/link";
import { useState } from "react";

import { signInAction } from "@/app/actions";
import { sendMagicLink } from "@/app/actions/sendMagicLink";
import { FormMessage, type Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function Login() {
  const [message, setMessage] = useState<Message | null>(null);
  const [isPasswordless, setIsPasswordless] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (isPasswordless) {
      // Handle magic link sign-in
      const email = formData.get("email") as string;
      const result = await sendMagicLink(email, "/protected"); // Adjust the redirect URL as needed

      if (result.success) {
        setMessage({
          type: "success",
          text: "Magic link sent. Please check your email.",
        });
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to send magic link",
        });
      }
    } else {
      // Handle regular sign-in
      const result = await signInAction(formData);

      if (!result) {
        setMessage({ type: "error", text: "An unexpected error occurred" });
        return;
      }

      if ("error" in result) {
        setMessage({ type: "error", text: "Invalid email or password" });
      } else {
        // Handle successful sign-in (e.g., redirect)
        // You might want to add your success logic here
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 flex flex-col min-w-80 mt-36"
    >
      <h1 className="text-2xl font-medium">Sign in</h1>
      <p className="text-sm text-foreground">
        Don&apos;t have an account?{" "}
        <Link className="text-foreground font-medium underline" href="/sign-up">
          Sign up
        </Link>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        {!isPasswordless && (
          <>
            <div className="flex justify-between items-center">
              <Label htmlFor="password">Password</Label>
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password"
              >
                Forgot Password?
              </Link>
            </div>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </>
        )}
        <SubmitButton
          pendingText={isPasswordless ? "Sending Link..." : "Signing In..."}
        >
          {isPasswordless ? "Send Magic Link" : "Sign in"}
        </SubmitButton>
        <Button
          type="button"
          variant="outline"
          onClick={() => setIsPasswordless(!isPasswordless)}
        >
          {isPasswordless ? "Use Password" : "Use Magic Link"}
        </Button>
        {message && <FormMessage message={message} />}
      </div>
    </form>
  );
}
