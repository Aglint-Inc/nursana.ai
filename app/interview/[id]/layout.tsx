import { notFound } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

export default async function InterviewLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { id: string };
}) {
  const supabase = createClient();
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
