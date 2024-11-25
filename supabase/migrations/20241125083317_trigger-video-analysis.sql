CREATE OR REPLACE TRIGGER "video_analysis_trigger" AFTER UPDATE OF "video_url" ON "public"."interview_analysis" FOR EACH ROW WHEN (("new"."video_url" IS NOT NULL)) EXECUTE FUNCTION "public"."video_analysis_trigger_function"();

CREATE OR REPLACE FUNCTION public.video_analysis_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
 DECLARE
    v_url TEXT;
BEGIN
 -- Retrieve the URL from the env table using the key 'BASE_URL'
    v_url := get_env_value('BASE_URL');
        PERFORM net.http_post(
            url := v_url || '/api/video-analysis',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('analysis_id', NEW.id, )::jsonb
        );
    RETURN NEW;
END;$function$
;