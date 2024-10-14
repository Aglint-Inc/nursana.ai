import InvalidCampagin from "@/components/invalid-campagin";
import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

async function getOrCreateNurse(userId: string) {
  const supabase = createClient();

  const { data: existingNurse, error: fetchError } = await supabase
    .from("nurses")
    .select()
    .eq("nurse_id", userId)
    .single();

  if (fetchError && fetchError.code !== "PGRST116") {
    throw fetchError;
  }

  if (!existingNurse) {
    const { error: nurseError } = await supabase.from("nurses").insert({
      nurse_id: userId,
      profile_status: "initial",
    });
    if (nurseError) throw nurseError;
    console.log("New nurse record created successfully");
  } else {
    console.log("Existing nurse record found");
  }
}

async function getOrCreateInterview(campaignCode: string, userId: string) {
  const supabase = createClient();

  const selectFields = `
    id,
    campaign_code,
    candidate_estimated_time,
    candidate_intro_video_cover_image_url,
    candidate_intro_video_url,
    candidate_overview,
    interview_stage,
    candidate_instructions
  `;

  // Move normalizeStage function here
  const normalizeStage = (stage: string) => {
    switch (stage) {
      case "not_started":
        return "get-started";
      case "resume_submitted":
      case "interview_inprogress":
        return "start-interview";
      case "interview_completed":
        return "summary";
      default:
        return "get-started"; // Default to get-started if unknown stage
    }
  };

  try {
    // First, try to fetch an existing interview
    const { data: existingInterview, error: fetchError } = await supabase
      .from("interviews")
      .select(selectFields)
      .eq("campaign_code", campaignCode)
      .eq("nurse_id", userId)
      .single();

    if (existingInterview) {
      existingInterview.interview_stage = normalizeStage(
        existingInterview.interview_stage
      );
      return existingInterview;
    }
    if (fetchError) {
      console.error(
        "Error fetching existing interview. Creating new interview."
      );
    }

    // If no existing interview, create a new one using the create_interview_v2 function
    const { data: newInterviewId, error: createError } = await supabase.rpc(
      "create_interview_v2",
      {
        p_campaign_code: campaignCode,
        p_nurse_id: userId,
        p_interview_stage: "not_started",
      }
    );

    if (createError) throw createError;

    // Fetch the newly created interview to get all the cloned data
    const { data: fullInterview, error: fullFetchError } = await supabase
      .from("interviews")
      .select(selectFields)
      .eq("id", newInterviewId)
      .single();

    if (fullFetchError) throw fullFetchError;

    if (fullInterview) {
      fullInterview.interview_stage = normalizeStage(
        fullInterview.interview_stage
      );
    }

    return fullInterview;
  } catch (error) {
    console.error("Error fetching or creating interview data:", error);
    throw error;
  }
}

export default async function HomePage() {
  const headersList = headers();
  const campaignCode = headersList.get("x-campaign-code");

  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.error("Error getting authenticated user:", userError);
    return <div>Authentication error. Please try logging in again.</div>;
  }

  const userId = user.id;

  if (!campaignCode) {
    return (
      <InvalidCampagin/>
    );
  }

  try {
    await getOrCreateNurse(userId);
    const interviewData = await getOrCreateInterview(campaignCode, userId);

    let redirectStage = interviewData.interview_stage;

    // Check and adjust the stage based on interview progress
    if (
      redirectStage === "summary" &&
      interviewData.interview_stage !== "interview_completed"
    ) {
      redirectStage = "start-interview";
    } else if (
      redirectStage === "start-interview" &&
      interviewData.interview_stage === "not_started"
    ) {
      redirectStage = "get-started";
    }

    // Redirect to the appropriate interview stage
    return redirect(`/interview/${interviewData.id}/${redirectStage}`);
  } catch (error: unknown) {
    if (
      error instanceof Error &&
      "digest" in error &&
      typeof error.digest === "string" &&
      error.digest.startsWith("NEXT_REDIRECT")
    ) {
      // This is a redirect, not an error. Let Next.js handle it.
      throw error;
    }
    console.error("Error setting up interview:", error);
    return <div>An error occurred. Please try again later.</div>;
  }
}
