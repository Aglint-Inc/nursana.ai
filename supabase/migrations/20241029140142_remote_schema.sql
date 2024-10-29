alter type "public"."job_titles" rename to "job_titles__old_version_to_be_dropped";

create type "public"."job_titles" as enum ('registered-nurse', 'nurse-practitioner', 'licensed-practical-nurse', 'clinical-nurse-specialist', 'certified-nurse-midwife', 'licensed-vocational-nurse', 'advanced-practice-registered-nurse', 'certified-registered-nurse-anesthetist', 'public-health-nurse', 'registered-nurse-board-certified', 'certified-nursing-assistant', 'home-health-aide', 'acute-care-nurse-practitioner', 'family-nurse-practitioner', 'pediatric-nurse-practitioner', 'adult-gerontology-nurse-practitioner', 'psychiatric-mental-health-nurse-practitioner', 'travel-nurse-license-compact-license');

alter table "public"."preferred_job_titles" alter column job_title type "public"."job_titles" using job_title::text::"public"."job_titles";

drop type "public"."job_titles__old_version_to_be_dropped";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.score_resume_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
        PERFORM net.http_post(
            -- url := 'https://933a-116-75-193-146.ngrok-free.app/api/score_resume',
            url := 'https://dev.nursana.ai/api/score_resume',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume_json', NEW.structured_resume)::jsonb
        );
    RETURN NEW;
END;$function$
;


