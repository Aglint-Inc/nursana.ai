import { Readable } from 'stream';
import { z } from 'zod';
import { zfd } from 'zod-form-data';

import { createPublicClient } from '@/db/client';
import { type PublicProcedure, publicProcedure } from '@/server/api/trpc';
import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';
export const resumeUploadDataSchema = zfd.formData({
  image: z.instanceof(File),
  fileExt: z.string(),
  campaign_id: z.string().uuid(),
  user_id: z.string().uuid().optional().nullable(),
  applicant_id: z.string().uuid().optional().nullable(),
});

const mutation = async ({
  input: { image, fileExt, user_id, applicant_id, campaign_id },
}: PublicProcedure<typeof resumeUploadDataSchema>) => {
  if (!user_id || !applicant_id || !campaign_id) throw new Error();
  const db = createPublicClient();

  const fileName = `${campaign_id}/${applicant_id}_${Date.now()}.${fileExt}`;
  const resume = await upload(image, fileName, fileExt);

  const { data, error } = await db
    .from('resume')
    .update({
      file_url: resume.url,
    })
    .eq('applicant_id', applicant_id)
    .eq('campaign_id', campaign_id)
    .select();

  return {
    resume,
    error,
    data,
  };
};

export const uploadResume = publicProcedure
  .input(resumeUploadDataSchema)
  .mutation(mutation);

const upload = async (file: File, fileName: string, fileExt: string) => {
  const fileStream = Readable.fromWeb(
    // @ts-expect-error - unsure why this is not working
    file.stream(),
  );
  const bucketName = 'resumes';

  const supabase = getSupabaseAdminServer();

  const { error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileStream, {
      cacheControl: '3600',
      upsert: false,
      duplex: 'half',
      contentType: fileExt.includes('pdf')
        ? 'application/pdf'
        : fileExt.includes('doc')
          ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
          : fileExt.includes('txt')
            ? 'text/plain'
            : 'application/pdf',
    });

  if (uploadError) {
    throw new Error(uploadError.message);
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return {
    url: publicUrl,
    name: file.name,
  };
};
