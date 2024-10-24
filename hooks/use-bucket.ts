import { useQuery } from '@tanstack/react-query';

import { supabase } from '@/utils/supabase/client';

const staleTime = process.env.NEXT_PUBLIC_PUBLIC_URL_EXP;

export function useBucket(bucket: 'videos' | 'audio', fileName: string) {
  return useQuery({
    queryKey: ['bucket', bucket, fileName],
    queryFn: () => getFileUrl(bucket, fileName),
    enabled: !!fileName,
    refetchInterval: staleTime * 1000 - 1000,
    refetchOnWindowFocus: false,
  });
}

export async function getFileUrl(bucket: 'videos' | 'audio', fileName: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .createSignedUrl(fileName, staleTime);
  if (error) {
    throw new Error(`Supabase signedURL error: ${error.message}`);
  }
  return data.signedUrl;
}
