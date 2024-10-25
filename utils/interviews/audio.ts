import { type SupabaseClientType } from '../supabase/type';

/**
 * Retrieves the URL of the call audio file for a given interview.
 *
 * @param supabase - The Supabase client.
 * @param interviewId - The ID of the interview.
 * @param options - Optional parameters for generating the signed URL.
 * @param options.expiresIn - The expiration time of the signed URL in seconds.
 * @param options.download - Specifies whether the URL should be used for downloading the file.
 *
 * @returns The signed URL of the call audio file.
 *
 * @throws Error if the audio file is not found or if there is an error generating the signed URL.
 */
export async function getCallAudioUrl(
  supabase: SupabaseClientType,
  interviewId: string,
  options?: {
    expiresIn: number;
    download: string | boolean;
  },
) {
  const bucket = 'audio';
  const path = await getPathAudioUrl(supabase, interviewId);
  if (!path) throw new Error('Audio file not found');
  const fileName = path.split(`${bucket}/`)[1];
  const { data, error } = await supabase.storage
    .from('audio')
    .createSignedUrl(fileName, options?.expiresIn || 60, {
      download: options?.download,
    });
  if (error) {
    throw new Error(error.message);
  }
  return data.signedUrl;
}

/**
 * Retrieves the audio URL for a given interview from the Supabase client.
 *
 * @param supabase - The Supabase client instance.
 * @param interviewId - The ID of the interview.
 * @returns The audio URL for the interview, or null if not found.
 */

async function getPathAudioUrl(
  supabase: SupabaseClientType,
  interviewId: string,
): Promise<string | null> {
  const audio_url = (
    await supabase
      .from('interview_analysis')
      .select('audio_url')
      .eq('interview_id', interviewId)
      .single()
      .throwOnError()
  ).data!.audio_url;
  return audio_url;
}
