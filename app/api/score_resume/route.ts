import { type NextRequest, NextResponse } from 'next/server';

import { createAdminClient } from '@/utils/supabase/server';
import { type SupdabasClientType } from '@/utils/supabase/type';

import { PromptArchive, type schemaType, score } from './util';

// @ts-ignore
interface NextRequestTS<T> extends NextRequest {
  json(): Promise<T>;
}

export async function POST(
  request: NextRequestTS<{
    interview_analysis_id: string;
    resume_json: schemaType;
  }>,
) {
  const { interview_analysis_id, resume_json } = await request.json();
  if (!interview_analysis_id && !resume_json) {
    return NextResponse.json(
      { error: 'Invalid interview analysis id required' },
      { status: 400 },
    );
  }

  const supabase = createAdminClient();

  const scoreObject = await Promise.all(
    PromptArchive.map((item) =>
      score(item.prompt, item.dataMapper(resume_json), item.schema).then(
        ({ object, usage }) => ({
          data: {
            [item.key]: object,
          },
          usage,
        }),
      ),
    ),
  );
  const usage = { promptTokens: 0, completionTokens: 0, totalTokens: 0 };
  const scoreJson = scoreObject.reduce((acc, item) => {
    usage.promptTokens += item.usage.promptTokens;
    usage.completionTokens += item.usage.completionTokens;
    usage.totalTokens += item.usage.totalTokens;
    return { ...acc, ...item.data };
  }, {});
  const data = await saveToDB(supabase, interview_analysis_id, {
    structured_analysis: scoreJson,
  });
  return NextResponse.json({
    data,
    usage,
    success: true,
  });
}

const saveToDB = async (
  supabase: SupdabasClientType,
  interview_analysis_id: string,
  data: any,
) => {
  return (
    await supabase
      .from('interview_analysis')
      .update(data)
      .eq('id', interview_analysis_id)
      .select('structured_analysis')
      .single()
      .throwOnError()
  ).data!;
};
