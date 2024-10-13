'use server'

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function uploadResume(formData: FormData) {
  const supabase = createClient();
  const file = formData.get('file') as File;
  const interviewId = formData.get('interviewId') as string;

  if (!file || !interviewId) {
    return { error: 'File or interview ID is missing' };
  }

  try {
    // Upload file to Supabase storage
    const { data, error } = await supabase.storage
      .from('resumes')
      .upload(`${interviewId}/${file.name}`, file);

    if (error) throw error;

    // Update interview stage and resume URL
    const { error: updateError } = await supabase
      .from("interviews")
      .update({ 
        interview_stage: "in_progress",
        resume_url: data.path
      })
      .eq("id", interviewId);

    if (updateError) throw updateError;

    revalidatePath(`/interview/in_progress`);
    return { success: true, path: `/interview/in_progress?id=${interviewId}` };
  } catch (error) {
    console.error("Error uploading resume:", error);
    return { error: 'Failed to upload resume' };
  }
}
