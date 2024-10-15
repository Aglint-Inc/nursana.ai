import { type NextRequest, NextResponse } from "next/server";

import { createClient } from "@/utils/supabase/server";

export async function POST(request: NextRequest) {
  try {
    const { callId } = await request.json();

    if (!callId) {
      throw new Error("Call ID is required");
    }

    const supabase = createClient();

    // Fetch call details from Retell API
    const retellResponse = await fetch(
      `https://api.retellai.com/v2/get-call/${callId}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.RETELL_API_KEY}`,
        },
      }
    );

    if (!retellResponse.ok) {
      const errorText = await retellResponse.text();
      console.error("Retell API error:", retellResponse.status, errorText);
      throw new Error(
        `Retell API error: ${retellResponse.status} ${errorText}`
      );
    }

    const retellData = await retellResponse.json();
    const { recording_url, public_log_url } = retellData;

    // Get the current user's ID
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError) throw userError;
    if (!user) throw new Error("User not found");

    const nurse_id = user.id;

    // Create a new row in nurse_video_interview_analysis
    const { data, error } = await supabase
      .from("nurse_video_interview_analysis")
      .insert({
        retell_call_id: callId,
        audio_url: recording_url,
        transcript_url: public_log_url,
        nurse_id,
        // Add any other relevant fields
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json({
      analysisId: data.id,
      audioUrl: recording_url,
      transcriptUrl: public_log_url,
    });
  } catch (error) {
    console.error("Error fetching call details:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch call details",
        details: (error as Error).message,
      },
      { status: 500 }
    );
  }
}
