import { type SupabaseClient } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import type {
  PhoneCallResponse,
  WebCallResponse,
} from "retell-sdk/src/resources/call";

import { createAdminClient } from "@/utils/supabase/server";

import { retellGetCallDetails } from "./util";

// @ts-ignore
interface NextRequestTS<T> extends NextRequest {
  json(): Promise<T>;
}

export async function POST(
  request: NextRequestTS<{ interview_analysis_id: string }>
) {
  const { interview_analysis_id } = await request.json();
  if (!interview_analysis_id) {
    return NextResponse.json(
      { error: "Invalid interview analysis id required" },
      { status: 400 }
    );
  }
  const supabase = createAdminClient();
  const { call_id } = await getInterviewAnalysis(
    supabase,
    interview_analysis_id
  );
  const {
    call_analysis,
    recording_url: audio_url,
    transcript_object,
  } = await retellGetCallDetails(call_id);
  if (audio_url?.trim().length) {
    const { extension, mimeType } = getMimeType(audio_url);
    // Fetch the audio file from the provided URL
    const response = await fetch(audio_url, { method: "GET" });

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Retrieve the audio file as an array buffer
    const blob = await response.blob();
    // const audioBuffer = await response.arrayBuffer();

    if (mimeType === "application/octet-stream") {
      throw new Error("Unsupported file type.");
    }

    // const blob = new Blob([audioBuffer], {
    //   type: mimeType,
    // });
    const audioFile = new File(
      [blob],
      `${interview_analysis_id}.${extension}`,
      {
        type: mimeType,
      }
    );
    const fileName = `interviews/${interview_analysis_id}.${extension}`;

    // // Upload the file to Supabase storage
    await UploadAudio(supabase, {
      fileName,
      file: audioFile,
      contentType: mimeType,
    });
    const audioFileUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/audio/${fileName}`;
    setInterviewAnalysis(supabase, interview_analysis_id, {
      audio_url: audioFileUrl,
      call_analysis,
      transcript_json:
        transcript_object?.map((item) => ({
          role: item.role,
          content: item.content,
        })) || [],
    });
    return NextResponse.json({
      success: true,
      audioUrl: audioFileUrl,
      transcript_object,
    });
  } else {
    return NextResponse.json({ error: "Invalid audio URL" }, { status: 400 });
  }
}
// transcript_json;
async function getInterviewAnalysis(
  supabase: SupabaseClient,
  interview_analysis_id: string
) {
  return (
    await supabase
      .from("interview_analysis")
      .select("call_id")
      .eq("id", interview_analysis_id)
      .single()
      .throwOnError()
  ).data!;
}

async function setInterviewAnalysis(
  supabase: SupabaseClient,
  interview_analysis_id: string,
  data: {
    audio_url: string;
    call_analysis:
      | WebCallResponse.CallAnalysis
      | PhoneCallResponse.CallAnalysis
      | undefined;
    transcript_json: { role: string; content: string }[];
  }
) {
  return (
    await supabase
      .from("interview_analysis")
      .update(data)
      .eq("id", interview_analysis_id)
      .throwOnError()
  ).data!;
}

async function UploadAudio(
  supabase: SupabaseClient,
  {
    fileName,
    file,
    contentType,
  }: { fileName: string; file: File; contentType: string }
) {
  // Upload the file to Supabase storage
  const { error } = await supabase.storage
    .from("audio") // Replace with your bucket name
    .upload(fileName, file, {
      contentType,
      upsert: true,
    });
  if (error) {
    throw new Error(`Supabase upload error: ${error.message}`);
  }
  return;
}

const getMimeType = (url: string) => {
  const extension = url.split(".").pop()?.toLowerCase();
  let mimeType = "application/octet-stream";
  switch (extension) {
    case "mp3":
      mimeType = "audio/mpeg";
      break;
    case "wav":
      mimeType = "audio/wav";
      break;
    case "ogg":
      mimeType = "audio/ogg";
      break;
  }
  return { extension, mimeType };
};
