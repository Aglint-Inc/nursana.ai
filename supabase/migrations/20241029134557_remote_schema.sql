alter table "public"."locations_list" drop constraint "locations_list_place_id_key";

drop index if exists "public"."locations_list_place_id_key";

alter table "public"."locations_list" drop column "place_id";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.call_analysis_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    PERFORM net.http_post(
        url := 'https://nursana.ai/api/score_call',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('analysis_id', NEW.id, 'transcript_json', NEW.transcript_json)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.post_process_interview()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    PERFORM net.http_post(
        url := 'https://nursana.ai/api/backup-interview-data',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('interview_analysis_id', NEW.id)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.resume_to_json_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
        PERFORM net.http_post(
            url := 'https://northamerica-northeast2-aglint-cloud-381414.cloudfunctions.net/nursera_ai_process_resume_v1',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume', NEW.file_url,'env','prod')::jsonb
        );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.score_resume_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
        PERFORM net.http_post(
            -- url := 'https://d7c7-2405-201-d041-58e6-54da-73e5-de3d-f136.ngrok-free.app/api/score_resume',
            url := 'https://nursana.ai/api/score_resume',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume_json', NEW.structured_resume)::jsonb
        );
    RETURN NEW;
END;$function$
;


