import { type retellAiGetCallType } from './schema.type';
import { SupabaseClientType } from '@/utils/supabase/type';

const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function retellGetCallDetails(callId: string) {
  if (!RETELL_API_KEY) {
    throw new Error('RETELL_API_KEY is required');
  }
  const res = await fetch(`https://api.retellai.com/v2/get-call/${callId}`, {
    headers: {
      Authorization: `Bearer ${RETELL_API_KEY}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error('Retell API error:', res.status, errorText);
    throw new Error(`Retell API error: ${res.status} ${errorText}`);
  }
  const retellData = (await res.json()) as unknown as retellAiGetCallType;
  return retellData;
}

export async function getInterviewAnalysis(
  supabase: SupabaseClientType,
  interview_analysis_id: string,
) {
  const { call_id, interview_id } = (
    await supabase
      .from('interview_analysis')
      .select('interview_id,call_id')
      .eq('id', interview_analysis_id)
      .single()
      .throwOnError()
  ).data!;
  if (!call_id) {
    throw new Error('Invalid call_id is not available');
  }
  return { call_id, interview_id };
}

export async function setInterviewAnalysis(
  supabase: SupabaseClientType,
  interview_analysis_id: string,
  data: {
    audio_url: string;
    call_analysis: retellAiGetCallType['call_analysis'];
    transcript_json: { role: string; content: string }[];
    structured_analysis?: {
      parsed: boolean;
      failed_reason: 'NO_REPLY' | 'PREMATURELY_CALL_ENDED';
    };
  },
) {
  return (
    await supabase
      .from('interview_analysis')
      .update(data)
      .eq('id', interview_analysis_id)
      .throwOnError()
  ).data!;
}

export async function UploadAudio(
  supabase: SupabaseClientType,
  {
    fileName,
    file,
    contentType,
  }: { fileName: string; file: File; contentType: string },
) {
  // Upload the file to Supabase storage
  const { error } = await supabase.storage
    .from('audio') // Replace with your bucket name
    .upload(fileName, file, {
      contentType,
      upsert: true,
    });
  if (error) {
    console.error('Supabase upload error:', error);
    throw new Error(`Supabase upload error: ${error.message}`);
  }
  return;
}

export function getMimeType(url: string) {
  const extension = url.split('.').pop()?.toLowerCase();
  let mimeType = 'application/octet-stream';
  switch (extension) {
    case 'mp3':
      mimeType = 'audio/mpeg';
      break;
    case 'wav':
      mimeType = 'audio/wav';
      break;
    case 'ogg':
      mimeType = 'audio/ogg';
      break;
  }
  return { extension, mimeType };
}

export function getDurationInMinutes(
  start_timestamp: number,
  end_timestamp: number,
): number | null {
  try {
    if (isNaN(start_timestamp) || isNaN(end_timestamp)) {
      throw new Error('Invalid timestamps');
    }

    const durationMs = end_timestamp - start_timestamp;

    if (durationMs < 0) {
      throw new Error('End timestamp is earlier than start timestamp');
    }

    const durationMinutes = Number((durationMs / (1000 * 60)).toFixed(1));
    return durationMinutes;
  } catch (error) {
    console.error('Error calculating call duration:', error);
    return null;
  }
}
