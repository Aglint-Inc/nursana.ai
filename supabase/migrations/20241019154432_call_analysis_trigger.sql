CREATE OR REPLACE FUNCTION public.call_analysis_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    PERFORM net.http_post(
        url := 'https://nursana.ai/api/score_call',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('analysis_id', NEW.id, 'transcript_json', NEW.transcript_json)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE TRIGGER "call_analysis_trigger" AFTER insert or update OF "transcript_json" ON "public"."interview_analysis" FOR EACH ROW WHEN ((NEW.transcript_json IS NOT NULL AND NEW.structured_analysis IS NOT NULL)) EXECUTE FUNCTION "public"."call_analysis_trigger_function"();