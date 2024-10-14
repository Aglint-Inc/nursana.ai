"use client";

import { useState, useEffect, useCallback } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
import { Cloud, FileText, Loader, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateInterviewStage } from "@/app/interview/[id]/[stage]/actions";
import { getResumeJson } from "@/utils/resume";


interface ResumeUploadProps {
  userId: string;
  interviewId: string;
}

export default function ResumeUpload({
  userId,
  interviewId,
}: ResumeUploadProps) {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [jobTitle, setJobTitle] = useState("nurse");
  const [dragActive, setDragActive] = useState(false);
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      const { data: nurseData, error: nurseError } = await supabase
        .from("nurses")
        .select("job_title")
        .eq("nurse_id", userId)
        .single();

      if (nurseError) {
        console.error("Error fetching nurse data:", nurseError);
      } else if (nurseData && nurseData.job_title) {
        setJobTitle(nurseData.job_title);
      }

      const { data: resumeData, error: resumeError } = await supabase
        .from("resumes")
        .select("file_url")
        .eq("nurse_id", userId)
        .single();

      if (resumeError) {
        console.error("Error fetching resume data:", resumeError);
      } else if (resumeData && resumeData.file_url) {
        setResumeUrl(resumeData.file_url);
      }
      setIsLoading(false);
    };

    fetchUserData();
  }, [supabase, userId]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
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
      setFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!file || !jobTitle) return;
    try {
      setUploading(true);
      const fileExt = file.name.split(".").pop();
      const fileName = `resumes/${userId}_${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) throw uploadError;

      const {
        data: { publicUrl },
      } = supabase.storage.from("resumes").getPublicUrl(fileName);

      const { data: updatedResume, error: resumeError } = await supabase
        .from("resumes")
        .upsert(
          {
            nurse_id: userId,
            file_url: publicUrl,
            structured_resume: null,
          },
          { onConflict: "nurse_id" }
        )
        .select()
        .single();

      if (resumeError) throw resumeError;

      getResumeJson(updatedResume.id, publicUrl);

      if (updatedResume) {
        setResumeUrl(updatedResume.file_url);
      }

      // Update nurse profile status
      const { error: nurseError } = await supabase
        .from("nurses")
        .update({
          job_title: jobTitle,
          profile_status: "resume_uploaded",
        })
        .eq("nurse_id", userId);

      if (nurseError) throw nurseError;

      console.log("Resume upload completed successfully");

      // After successful upload, update the interview stage
      try {
        await updateInterviewStage(interviewId, "resume_submitted");
        console.log(
          "Interview stage updated successfully to 'resume_submitted'"
        );
      } catch (updateError) {
        console.error("Failed to update interview stage:", updateError);
        // Optionally, you can show an error message to the user here
      }
    } catch (error) {
      console.error("Error during resume upload or profile update:", error);
      // Optionally, you can show an error message to the user here
    } finally {
      setUploading(false);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center">
          <span className="text-teal-600">
            Let Nursana&apos;s AI find your next opportunity.
          </span>
          <br />
          <span className="text-navy-900">Get started now!</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="job-title">Choose your job title</Label>
              <Select onValueChange={setJobTitle} value={jobTitle}>
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
            <div>
              <Label htmlFor="resume" className="flex items-center gap-2">
                <Cloud className="h-5 w-5" />
                {resumeUrl ? "Update your resume" : "Upload your resume"}
              </Label>
              {resumeUrl && (
                <div className="mt-2 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  <a
                    href={resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline"
                  >
                    View current resume
                  </a>
                </div>
              )}
              <p className="text-sm text-gray-500">
                {resumeUrl
                  ? "Select a new file to update your resume"
                  : "Select and upload your resume"}
              </p>
              {!file ? (
                <div
                  className={`mt-2 flex justify-center rounded-lg border border-dashed ${
                    dragActive ? "border-primary" : "border-gray-900/25"
                  } px-6 py-10`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="text-center">
                    <Cloud
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-primary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 hover:text-primary/80"
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
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PDF, DOC up to 10MB
                    </p>
                  </div>
                </div>
              ) : (
                <div className="mt-2">
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    {uploading ? (
                      <span className="text-sm text-gray-500">
                        <Loader className="h-4 w-4 animate-spin" /> Uploading
                        resume...
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFile(null)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
          <Button
            className="w-full mt-4"
            type="submit"
            disabled={!file || !jobTitle || uploading || isLoading}
          >
            {uploading
              ? "Uploading..."
              : resumeUrl
              ? "Update Resume"
              : "Upload Resume"}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex flex-col items-center">
        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <a href="/sign-in" className="text-blue-600 hover:underline">
            Login here
          </a>
          .
        </p>
      </CardFooter>
    </Card>
  );
}
