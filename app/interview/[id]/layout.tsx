import { notFound } from 'next/navigation';

import { supabase } from '@/utils/supabase/client';

export default async function InterviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const { data: interview, error } = await supabase
    .from('interview')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !interview) {
    notFound();
  }

  return <div className=''>{children}</div>;
}
