import { supabase } from "./client/supabaseClient";
export type ErrorType =
  | "SYSTEM_ERROR"
  | "UNSUPPORTED_FORMAT"
  | "AI_ERROR"
  | "DB_ERROR"
  | "PARSING_ERROR";
export const getResponse = ({
  data,
  saved = false,
  error,
  application_id,
  type = "SYSTEM_ERROR",
  test,
}: {
  data?: any;
  saved?: boolean;
  error?: string;
  application_id?: string;
  type?: ErrorType;
  test: boolean;
}) => {
  if (!test && error && application_id) {
    logs(application_id, {
      step: "process_resume_v1",
      message: error,
      type,
    });
  }
  return { data, saved, error, type };
};

export const saveToDB = async ({
  table,
  data,
  id,
}: {
  table: "resumes";
  data: { structured_resume: any };
  id: string;
}) => {
  if (id.trim() === "") return false;
  const { error } = await supabase
    .from(table)
    .update({ ...data })
    .eq("id", id);
  if (error) {
    console.error(error);
  }
  return !error;
};

export const logs = async (
  id: string,
  error_status: {
    step: string;
    message: string;
    type: ErrorType;
  }
) => {
  console.log("Logging Error: ", error_status);
  return await supabase
    .from("resumes")
    .update({
      error_status,
    })
    .eq("id", id);
};

export const newAbortSignal = (timeoutMs: number, funcName: string) => {
  const abortController = new AbortController();
  setTimeout(() => {
    abortController.abort();
    console.log("Aborting Signal for:", funcName);
  }, timeoutMs || 0);
  return abortController.signal;
};
