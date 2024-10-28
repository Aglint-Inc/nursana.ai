"use client";

import { forgotPasswordAction } from "app/actions";
import { KeyRound } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import Footer from "@/components/footer";
import { FormMessage, type Message } from "@/components/form-message";
import NursanaLogo from "@/components/nursana-logo";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ForgotPassword() {
  const [message, setMessage] = useState<Message | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const result = await forgotPasswordAction(formData);
    if ("error" in result) {
      setMessage({ type: "error", text: "Password reset error" });
    } else {
      setMessage({ type: "success", text: "Password reset email sent" });
    }
  };

  return (
 
    <div className="p-4 max-w-xl w-full mx-auto min-h-screen flex flex-col justify-between items-center">
      <NursanaLogo/>
      <form
        onSubmit={handleSubmit}
        className="flex-1 flex flex-col gap-2 justify-center text-foreground [&>input]:mb-6 min-w-64 max-w-[400px] w-full mx-auto"
      >
        <div className="flex flex-col gap-2 items-center justify-center" >
          <KeyRound size={50} strokeWidth={1.5} className="text-purple-600"/>
          <h1 className="text-3xl font-medium">Reset Password</h1>
          <p className="text-sm text-secondary-foreground">
            Already have an account?{" "}
            <Link className="text-primary underline" href="/auth/sign-in">
              Sign in
            </Link>
          </p>
        </div>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="you@example.com" required />
          <SubmitButton>Reset Password</SubmitButton>
          {message && <FormMessage message={message} />}
        </div>
      </form>
      <Footer/>
      </div>

  );
}
