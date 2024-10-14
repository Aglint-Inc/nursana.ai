import { supabase } from "./client";

export const getResponse = ({
  json,
  embeddings,
  token = null,
  saved = false,
  error,
  application_id,
}: {
  json?: any;
  embeddings?: any;
  token?: {
    totalCompletionTokens: number;
    totalPromptTokens: number;
    totalExecutionTokens: number;
  } | null;
  saved?: boolean;
  error?: string;
  application_id?: string;
}) => {
  if (error && application_id) {
    console.error({ error });
  }
  return { json, embeddings, saved, token, error };
};

export const saveToDB = async ({
  table,
  data,
  id,
}: {
  table: "applications" | "candidate_files" | "candidates";
  data: any;
  id: string;
}) => {
  console.log({ saveToDB: { table, data, id } });
  if (!id && id.trim() === "") return false;
  const { error } = await supabase
    .from(table)
    .update({ ...data })
    .eq("id", id);
  if (error) {
    console.error({ error });
  }
  return !Boolean(error);
};
