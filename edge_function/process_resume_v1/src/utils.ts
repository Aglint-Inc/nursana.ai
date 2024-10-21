import { supabase } from './client/supabaseClient';

export type ErrorType =
  | 'SYSTEM_ERROR'
  | 'UNSUPPORTED_FORMAT'
  | 'AI_ERROR'
  | 'DB_ERROR'
  | 'PARSING_ERROR';

export const getResponse = ({
  data,
  saved = false,
  error,
  resume_id,
  type = 'SYSTEM_ERROR',
  test,
}: {
  data?: any;
  saved?: boolean;
  error?: string;
  resume_id?: string;
  type?: ErrorType;
  test: boolean;
}) => {
  if (!test && error && resume_id) {
    logs(resume_id, {
      step: 'process_resume_v1',
      message: error,
      type,
    });
  }
  return { data, saved, error, type };
};

export const saveToDB = async ({
  data,
  id,
}: {
  data: { structured_resume?: any; processing_status?: any };
  id: string;
}) => {
  const { error } = await supabase
    .from('resume')
    .update({ ...data })
    .eq('id', id);
  // .throwOnError()
  if (error) throw new Error(`saveToDB: 'resume' error:${error.message}`);
  return;
};

export const logs = async (
  id: string,
  error_status: {
    step: string;
    message: string;
    type: ErrorType;
  },
) => {
  console.error('Logging Error: ', error_status);
  return await saveToDB({
    id,
    data: {
      processing_status: {
        resume_to_json_api: {
          error: error_status.type,
          error_message: error_status.message,
          timestamp: new Date().toISOString(),
          status: 'error',
        },
      },
    },
  });
};

export const newAbortSignal = (timeoutMs: number, funcName: string) => {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
    console.log('Aborting Signal for:', funcName);
  }, timeoutMs || 0);
  return abortController.signal;
};

export async function setToProcessing(id: string) {
  await saveToDB({
    id,
    data: {
      processing_status: {
        resume_to_json_api: {
          timestamp: new Date().toISOString(),
          status: 'processing',
        },
      },
    },
  });
}
