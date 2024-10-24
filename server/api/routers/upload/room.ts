import { Readable } from 'stream';
import { zfd } from 'zod-form-data';

import { getSupabaseAdminServer } from '@/utils/supabase/supabaseAdmin';

import { createTRPCRouter, publicProcedure } from '../../trpc';

export const uploadFileSchema = zfd.formData({
  name: zfd.text(),
  image: zfd.file(),
});

export const uploadRouter = createTRPCRouter({
  sendMessage: publicProcedure
    .input(uploadFileSchema)
    .mutation(async ({ input }) => {
      return {
        image: await upload(input.image),
      };
    }),
});

export async function upload(file: File) {
  const fileStream = Readable.fromWeb(
    // @ts-expect-error - unsure why this is not working
    file.stream(),
  );
  const bucketName = 'test';

  const supabase = getSupabaseAdminServer();

  const fileExt = 'pdf';
  const fileName = `test_${Date.now()}.${fileExt}`;

  const { data, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(fileName, fileStream, {
      cacheControl: '3600',
      upsert: false,
      duplex: 'half',
      contentType: 'application/pdf',
    });
  console.log({ data, uploadError });

  const {
    data: { publicUrl },
  } = supabase.storage.from(bucketName).getPublicUrl(fileName);

  return {
    url: publicUrl,
    name: file.name,
  };
}
