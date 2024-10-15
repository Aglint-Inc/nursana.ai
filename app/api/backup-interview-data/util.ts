const RETELL_API_KEY = process.env.RETELL_API_KEY;

export async function retellGetCallDetails(callId: string) {
  if (!RETELL_API_KEY) {
    throw new Error("RETELL_API_KEY is required");
  }
  const res = await fetch(`https://api.retellai.com/v2/get-call/${callId}`, {
    headers: {
      Authorization: `Bearer ${RETELL_API_KEY}`,
    },
  });
  if (!res.ok) {
    const errorText = await res.text();
    console.error("Retell API error:", res.status, errorText);
    throw new Error(`Retell API error: ${res.status} ${errorText}`);
  }
  const retellData = (await res.json()) as unknown as retellAiGetCallType;
  return retellData;
}

export type retellAiGetCallType = {
  call_id: string;
  call_type: string;
  from_number: string;
  to_number: string;
  direction: "inbound" | "outbound";
  agent_id: string;
  access_token: string;
  call_status: "registered" | "ongoing" | "ended" | "error";
  metadata: Data;
  retell_llm_dynamic_variables: RetellLlmDynamicVariables;
  opt_out_sensitive_data_storage: boolean;
  start_timestamp: number;
  end_timestamp: number;
  transcript: string;
  transcript_object: Transcript[];
  transcript_with_tool_calls: Transcript[];
  recording_url: string;
  public_log_url: string;
  e2e_latency: Latency;
  llm_latency: Latency;
  llm_websocket_network_rtt_latency: Latency;
  disconnection_reason: disconnection_reason;
  call_analysis: CallAnalysis;
};

type CallAnalysis = {
  call_summary: string;
  in_voicemail: boolean;
  user_sentiment: "Negative" | "Positive" | "Neutral" | "Unknown";
  call_successful: boolean;
  custom_analysis_data: Data;
};

type Data = Record<string, any>;

type Latency = {
  p50: number;
  p90: number;
  p95: number;
  p99: number;
  max: number;
  min: number;
  num: number;
};

type RetellLlmDynamicVariables = {
  customer_name: string;
};

type Transcript = {
  role: string;
  content: string;
  words: Word[];
};

type Word = {
  word: string;
  start: number;
  end: number;
};

type disconnection_reason =
  | "user_hangup"
  | "agent_hangup"
  | "call_transfer"
  | "voicemail_reached"
  | "inactivity"
  | "machine_detected"
  | "max_duration_reached"
  | "concurrency_limit_reached"
  | "no_valid_payment"
  | "scam_detected"
  | "error_inbound_webhook"
  | "dial_busy"
  | "dial_failed"
  | "dial_no_answer"
  | "error_llm_websocket_open"
  | "error_llm_websocket_lost_connection"
  | "error_llm_websocket_runtime"
  | "error_llm_websocket_corrupt_payload"
  | "error_frontend_corrupted_payload"
  | "error_twilio"
  | "error_no_audio_received"
  | "error_asr"
  | "error_retell"
  | "error_unknown"
  | "error_user_not_joined"
  | "registered_call_timeout";
