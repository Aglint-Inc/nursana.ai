"use client";

import { File, UploadCloud, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { api } from "trpc/client";

import { AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { supabase } from "@/utils/supabase/client";

import Section from "../../../../components/section";
import { createUser } from "../actions/createUser";

export type Role = "nurse" | "doctor" | "therapist";

export type FormCampaign = {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  file: File | null;
  role: Role;
};

export default function FormCampaign() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaign_code = searchParams.get("campaign_code") as string;
  const [form, setForm] = useState<FormCampaign>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    file: null,
    role: "nurse",
  });
  const [saving, setSaving] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { mutateAsync } = api.user.create.useMutation();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setForm({ ...form, file: event.target.files[0] });
    }
  };

  const handleDrag = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, file: e.dataTransfer.files[0] });
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (form.file && form.role && form.first_name && form.email) {
      try {
        setSaving(true);
        const resUser = await createUser({
          email: form.email,
        });

        if (resUser.error)
          throw new Error(resUser.error.message || resUser.error.code);

        const userId = resUser.data.user?.id;

        const fileExt = form.file.name.split(".").pop();
        const fileName = `resumes/${userId}_${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from("resumes")
          .upload(fileName, form.file, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("resumes").getPublicUrl(fileName);

        const res = await mutateAsync({
          campaign_code,
          resume_url: publicUrl,
          userId,
          email: form.email,
          first_name: form.first_name,
          last_name: form.last_name,
          role: form.role,
        });

        if (res) {
          router.push(`/interview/${res.id}/start-interview`);
        }

        console.log(res);
      } catch (error) {
        console.log(error);

        setError(error.message);
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <Section>
      <div className="flex flex-col gap-16 items-center">
        <div className="max-w-screen-xl flex flex-col gap-2 items-center">
          <h1 className="text-5xl font-medium">
            Let Nursera&apos;s AI find your next opportunity.
          </h1>
          <h1 className="text-5xl font-medium">Get started now!</h1>
        </div>
        <Card className="w-full max-w-lg bg-muted ">
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row w-full gap-4">
                  <div className="flex flex-col gap-2 w-full">
                    <Label htmlFor="job-title">Choose your job title</Label>
                    <Select
                      onValueChange={(val: Role) =>
                        setForm({ ...form, role: val })
                      }
                      value={form.role}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a job title" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="nurse">Nurse</SelectItem>
                        <SelectItem value="doctor">Doctor</SelectItem>
                        <SelectItem value="therapist">Therapist</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      placeholder="Enter your email"
                      value={form.email}
                      onChange={(e) => {
                        setForm({ ...form, email: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-row w-full gap-4">
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      placeholder="Enter your first name"
                      value={form.first_name}
                      onChange={(e) => {
                        setForm({ ...form, first_name: e.target.value });
                      }}
                    />
                  </div>
                  <div className="flex flex-col w-full gap-2">
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      placeholder="Enter your last name"
                      value={form.last_name}
                      onChange={(e) => {
                        setForm({ ...form, last_name: e.target.value });
                      }}
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  {!form.file ? (
                    <div
                      className={`mt-2 flex justify-center rounded-lg border border-dashed ${
                        dragActive ? "bg-background" : "bg-background"
                      } px-6 py-10`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <div className="text-center">
                        <UploadCloud
                          className="mx-auto h-12 w-12 text-muted-foreground"
                          aria-hidden="true"
                          strokeWidth={1.2}
                        />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer rounded-md font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-primary/80"
                          >
                            <span>Upload a file</span>
                            <Input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              onChange={handleFileChange}
                              accept=".pdf,.doc,.docx"
                            />
                          </label>

                          <p className="pl-1  text-muted-foreground">
                            or drag and drop
                          </p>
                        </div>
                        <p className="text-xs leading-5 text-muted-foreground">
                          PDF, DOC up to 10MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-2">
                      <div className="flex items-center justify-between bg-background p-2 rounded border-input shadow-none h-14">
                        <div className="flex items-center gap-3 px-2">
                          <File size={20} className="text-muted-foreground" />
                          <span className="text-sm truncate">
                            {form.file?.name}
                          </span>
                        </div>

                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setForm({ ...form, file: null })}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              {error && (
                <AlertDescription className="text-red-500">
                  {error}
                </AlertDescription>
              )}

              <Button
                className="w-full mt-4"
                type="submit"
                disabled={
                  !form.email ||
                  !form.role ||
                  !form.first_name ||
                  !form.file ||
                  saving
                }
              >
                Continue
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <a href="/sign-in" className="underline text-card-foreground">
                Login here
              </a>
              .
            </p>
          </CardFooter>
        </Card>
      </div>
    </Section>
  );
}
