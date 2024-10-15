"use client";

import { useToast } from "hooks/use-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "trpc/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/utils/supabase/client";

export default function NurseSignIn() {
  const [role, setRole] = useState<"nurse" | "company">("nurse");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const { mutateAsync } = api.user.check.useMutation();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setIsLoading(false);
      const res = await mutateAsync({ email });
      if (res) {
        if (role === "nurse") {
          await nurseSignIn({ email });
        } else {
          await companySignIn({ email, password });
        }
      }
    } catch (error) {
      toast({ variant: "destructive", title: error.message });
    } finally {
      setIsLoading(false);
    }
  }

  const nurseSignIn = async ({ email }: { email: string }) => {
    const { error } = await supabase.auth.signInWithOtp({
      email: email,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm`,
      },
    });
    if (error) {
      throw new Error(error.message);
    } else {
      router.push("/auth/check-email");
    }
  };

  const companySignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) {
      throw new Error(error.message);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col gap-4 w-[300px]">
          <div id="role" className="flex  gap-2 flex-col">
            <label
              htmlFor="role"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Role
            </label>
            <Select
              value={role}
              onValueChange={(val: "nurse" | "company") => {
                setRole(val);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="nurse"> Nurse</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex  gap-2 flex-col">
            <label
              htmlFor="email"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              Email
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          {role === "company" && (
            <div className="flex  gap-2 flex-col">
              <label
                htmlFor="password"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
              />
            </div>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? "Sending..."
            : role === "nurse"
              ? "Get Magic Link"
              : "Sign In"}
        </Button>
      </form>
    </div>
  );
}
