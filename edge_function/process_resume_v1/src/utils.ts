import { supabase } from "./client/supabaseClient";

export const getResponse = ({
  data,
  saved = false,
  error,
  application_id,
}: {
  data?: any;
  saved?: boolean;
  error?: string;
  application_id?: string;
}) => {
  if (error && application_id) {
    console.error("Error: ", error);
    logs(application_id, {
      step: "process_resume_v1",
      message: error,
    });
  }
  return { data, saved, error };
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
  return !Boolean(error);
};

export const logs = async (
  id: string,
  error_status: {
    step: string;
    message: string;
  }
) => {
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
