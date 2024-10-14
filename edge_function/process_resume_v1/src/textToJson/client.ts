import { createClient } from "@supabase/supabase-js";

import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required."
  );
}
if (!OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variables are required.");
}
export const supabase = createClient(supabaseUrl, supabaseKey);

export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
