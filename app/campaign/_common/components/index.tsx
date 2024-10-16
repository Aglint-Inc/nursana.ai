"use client";

import { File, UploadCloud, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useCallback, useState } from "react";
import { api } from "trpc/client";

import LoadingWapper from "@/common/components/LoadingWapper";
import { UIButton } from "@/common/components/UIButton";
import UISelectDropDown from "@/common/components/UISelectDropDown";
import UITextField from "@/common/components/UITextField";
import { capitalize } from "@/common/utils/capitalize";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/utils/supabase/client";

import Section from "../../../../components/section";
import { useCampaign } from "../hooks/useCampaign";

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
  const { data } = useCampaign();
  const { toast } = useToast();
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

  const { mutateAsync: createUser } = api.user.create.useMutation();
  const { mutateAsync: createInterview } =
    api.user.create_interview.useMutation();

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

  const { mutateAsync } = api.campaign.check_user.useMutation();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (form.file && form.role && form.first_name && form.email) {
      try {
        setSaving(true);

        const resCheckUser = await mutateAsync({
          campaign_id: data?.id,
          email: form.email,
        });

        if (resCheckUser.resume?.id) {
          return toast({
            description: "You have already applied for this campaign",
            variant: "destructive",
          });
        }

        let userId: string | null = null;

        if (!resCheckUser.user?.id) {
          const resUser = await createUser({
            email: form.email,
            first_name: form.first_name,
            last_name: form.last_name,
            role: form.role,
          });
          if (resUser.error)
            throw new Error(resUser.error.message || resUser.error.code);
          userId = resUser.data.user?.id;
        } else {
          userId = resCheckUser.user.id;
        }

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

        const res = await createInterview({
          campaign_code,
          resume_url: publicUrl,
          userId,
        });

        if (res?.id) {
          const { error } = await supabase.auth.signInWithOtp({
            email: form.email,
            options: {
              // emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/interview/${res.id}/start-interview`,
              emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/confirm?interview_id=${res.id}`,
            },
          });
          if (error) {
            throw new Error("Error creating interview");
          }
          toast({
            description:
              "Interview link has been sent to your email. Please check your inbox.",
            variant: "default",
          });
        } else {
          throw new Error("Error creating interview");
        }

        setForm({
          first_name: "",
          last_name: "",
          email: "",
          phone: "",
          file: null,
          role: "nurse",
        });
      } catch (error) {
        console.log(error);
        toast({
          description:
            error.message ?? "An error occurred. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setSaving(false);
      }
    }
  };

  return (
    <Section>
      <div className="flex flex-col gap-16 items-center w-full">
        <div className="max-w-screen-xl flex flex-col gap-2 items-center">
          <h1 className="text-5xl font-medium">
            Let Nursera&apos;s AI find your next opportunity.
          </h1>
          <h1 className="text-5xl font-medium">Get started now!</h1>
        </div>

        <Card className="max-w-lg bg-muted ">
          <CardContent className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-8">
                <div className="flex flex-row w-full gap-4">
                  <UISelectDropDown
                    disabled={saving}
                    fullWidth
                    label="Choose your job title"
                    menuOptions={["nurse", "doctor", "therapist"].map(
                      (role) => ({
                        name: capitalize(role),
                        value: role,
                      })
                    )}
                    onValueChange={(val: Role) =>
                      setForm({ ...form, role: val })
                    }
                    value={form.role}
                  />
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label="Email"
                    placeholder="Enter your email"
                    value={form.email}
                    onChange={(e) => {
                      setForm({ ...form, email: e.target.value });
                    }}
                  />
                </div>
                <div className="flex flex-row w-full gap-4">
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label="First Name"
                    placeholder="Enter your first name"
                    value={form.first_name}
                    onChange={(e) => {
                      setForm({ ...form, first_name: e.target.value });
                    }}
                  />
                  <UITextField
                    disabled={saving}
                    fullWidth
                    label="Last Name"
                    placeholder="Enter your last name"
                    value={form.last_name}
                    onChange={(e) => {
                      setForm({ ...form, last_name: e.target.value });
                    }}
                  />
                </div>
                <LoadingWapper loading={saving}>
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
                            onClick={() => setForm({ ...form, file: null })}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </LoadingWapper>
              </div>

              <UIButton
                className="w-full mt-4"
                type="submit"
                isLoading={saving}
                disabled={
                  !form.email || !form.role || !form.first_name || !form.file
                }
              >
                Get Interview Link
              </UIButton>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center">
            <p className="mt-4 text-sm text-muted-foreground">
              Already have an account?{" "}
              <a
                href="/auth/sign-in"
                className="underline text-card-foreground"
              >
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
