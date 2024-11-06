CREATE OR REPLACE FUNCTION public.call_analysis_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
 DECLARE
    v_url TEXT;
BEGIN
    -- Retrieve the URL from the env table using the key 'BASE_URL'
    v_url := get_env_value('BASE_URL');

    -- Perform the HTTP POST request using the fetched URL
    PERFORM net.http_post(
        url := v_url || 'api/score_call',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('analysis_id', NEW.id, 'transcript_json', NEW.transcript_json)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.post_process_interview()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
 DECLARE
    v_url TEXT;
BEGIN
    -- Retrieve the URL from the env table using the key 'BASE_URL'
    v_url := get_env_value('BASE_URL');
    PERFORM net.http_post(
        url := v_url || '/api/backup-interview-data',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('interview_analysis_id', NEW.id)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.resume_to_json_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_url TEXT;
    dep_env TEXT;
BEGIN
    -- Retrieve the URL from the env table using the key 'RESUME_TO_JSON_URL'
    v_url := get_env_value('RESUME_TO_JSON_URL');
    dep_env := get_env_value('ENV');
    -- Perform the HTTP POST request using the fetched URL
    PERFORM net.http_post(
        url := v_url,
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('resume_id', NEW.id, 'resume', NEW.file_url, 'env', dep_env)::jsonb
    );

    RETURN NEW;
END;
$function$
;

CREATE OR REPLACE FUNCTION public.score_resume_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
 DECLARE
    v_url TEXT;
BEGIN
 -- Retrieve the URL from the env table using the key 'BASE_URL'
    v_url := get_env_value('BASE_URL');
        PERFORM net.http_post(
            url := v_url || '/api/dynamic_resume_score',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume_json', NEW.structured_resume)::jsonb
        );
    RETURN NEW;
END;$function$
;