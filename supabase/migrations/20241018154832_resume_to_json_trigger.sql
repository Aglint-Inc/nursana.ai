CREATE OR REPLACE FUNCTION public.resume_to_json_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
        PERFORM net.http_post(
            url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/nursera_ai_process_resume_v1',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume', NEW.file_url)::jsonb
        );
    RETURN NEW;
END
$function$;

CREATE OR REPLACE TRIGGER "resume_to_json_trigger" AFTER insert or update OF "file_url" ON "public"."resume" FOR EACH ROW WHEN (NEW.file_url = '' AND NEW.structured_resume IS NULL) EXECUTE FUNCTION "public"."resume_to_json_trigger_function"();