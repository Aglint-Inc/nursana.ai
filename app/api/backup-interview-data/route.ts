import { type NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/utils/supabase/server';

import {
  getDurationInMinutes,
  getInterviewAnalysis,
  getMimeType,
  retellGetCallDetails,
  setInterviewAnalysis,
  UploadAudio,
} from './util';

// @ts-ignore
interface NextRequestTS<T> extends NextRequest {
  json(): Promise<T>;
}

export async function POST(
  request: NextRequestTS<{ interview_analysis_id: string }>,
) {
  const { interview_analysis_id } = await request.json();
  if (!interview_analysis_id) {
    return NextResponse.json(
      { error: 'Invalid interview analysis id required' },
      { status: 400 },
    );
  }
  const supabase = createAdminClient();
  const { interview_id, call_id } = await getInterviewAnalysis(
    supabase,
    interview_analysis_id,
  );
  const {
    call_analysis: temp_call_analysis,
    start_timestamp,
    end_timestamp,
    recording_url: audio_url,
    transcript_object: tempTranscript,
  } = await retellGetCallDetails(call_id);
  const duration_minutes =
    getDurationInMinutes(start_timestamp, end_timestamp) || 0;
  const call_analysis = {
    ...temp_call_analysis,
    duration_minutes,
  };
  const transcript_object =
    tempTranscript?.map((item) => ({
      role: item.role,
      content: item.content,
    })) || [];
  let structured_analysis:
    | {
        parsed: boolean;
        failed_reason: 'NO_REPLY' | 'PREMATURELY_CALL_ENDED';
      }
    | undefined;
  if (duration_minutes < 5) {
    structured_analysis = {
      parsed: false,
      failed_reason: 'PREMATURELY_CALL_ENDED',
    };
  } else if (transcript_object.length <= 1) {
    structured_analysis = {
      parsed: false,
      failed_reason: 'NO_REPLY',
    };
  }
  if (audio_url?.trim().length) {
    const { extension, mimeType } = getMimeType(audio_url);
    // Fetch the audio file from the provided URL
    const response = await fetch(audio_url, { method: 'GET' });

    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }

    // Retrieve the audio file as an array buffer
    const blob = await response.blob();
    // const audioBuffer = await response.arrayBuffer();

    if (mimeType === 'application/octet-stream') {
      throw new Error('Unsupported file type.');
    }

    // const blob = new Blob([audioBuffer], {
    //   type: mimeType,
    // });
    const audioFile = new File([blob], `${interview_id}.${extension}`, {
      type: mimeType,
    });
    const fileName = `interviews/${interview_id}.${extension}`;

    // // Upload the file to Supabase storage
    await UploadAudio(supabase, {
      fileName,
      file: audioFile,
      contentType: mimeType,
    });
    const audioFileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/audio/${fileName}`;
    setInterviewAnalysis(supabase, interview_analysis_id, {
      audio_url: audioFileUrl,
      call_analysis,
      transcript_json:
        transcript_object?.map((item) => ({
          role: item.role,
          content: item.content,
        })) || [],
      structured_analysis,
    });
    return NextResponse.json({
      success: true,
      audioUrl: audioFileUrl,
      transcript_object,
    });
  } else {
    return NextResponse.json({ error: 'Invalid audio URL' }, { status: 400 });
  }
}
