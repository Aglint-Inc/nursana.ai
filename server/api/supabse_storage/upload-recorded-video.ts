import { z } from 'zod';

import { supabase } from '@/utils/supabase/client';

import { type ApplicantProcedure, applicantProcedure } from '../trpc';

const schema = z.object({
  filePath: z.string(),
  file: z.instanceof(Blob),
});

const query = async ({ input }: ApplicantProcedure<typeof schema>) => {
  const { filePath, file } = input;

  const { error } = await supabase.storage
    .from('videos')
    .upload(filePath, file, {
      contentType: 'video/webm',
      cacheControl: '3600',
      upsert: false,
    });
  if (error) {
    return {
      error,
    };
  } else {
    return {
      error: null,
    };
  }
};

export const uploadRecordedVideo = applicantProcedure
  .input(schema)
  .mutation(query);
