"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function updateInterviewStage(
  interviewId: string,
  newStage: string
) {
  const supabase = createClient();
  console.log("Attempting to update interview stage...");
  console.log("Interview ID:", interviewId);
  console.log("New stage:", newStage);

  try {
    const { data, error } = await supabase
      .from("interviews")
      .update({ interview_stage: newStage })
      .eq("id", interviewId)
      .select();

    if (error) {
      console.error("Error updating interview stage:", error);
      throw error;
    }

    if (data) {
      console.log("Interview stage updated successfully");
      console.log("Updated interview data:", data);
    } else {
      console.warn("No data returned from update operation");
    }

    console.log("Redirecting to:", `/interview/${interviewId}/start-interview`);
    redirect(`/interview/${interviewId}/start-interview`);
  } catch (error) {
    console.error("Unexpected error in updateInterviewStage:", error);
    throw error;
  }
}
