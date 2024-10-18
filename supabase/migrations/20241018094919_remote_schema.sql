create table "public"."interview_analysis_id" (
    "id" uuid
);


alter table "public"."resume" add column "processing_status" jsonb;

alter table "public"."resume" add column "resume_feedback" jsonb;

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.score_resume_trigger_function()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
        PERFORM net.http_post(
            url := 'https://nursana.ai/api/score_resume',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('resume_id', NEW.id, 'resume_json', NEW.structured_resume)::jsonb
        );
    RETURN NEW;
END;$function$
;

grant delete on table "public"."interview_analysis_id" to "anon";

grant insert on table "public"."interview_analysis_id" to "anon";

grant references on table "public"."interview_analysis_id" to "anon";

grant select on table "public"."interview_analysis_id" to "anon";

grant trigger on table "public"."interview_analysis_id" to "anon";

grant truncate on table "public"."interview_analysis_id" to "anon";

grant update on table "public"."interview_analysis_id" to "anon";

grant delete on table "public"."interview_analysis_id" to "authenticated";

grant insert on table "public"."interview_analysis_id" to "authenticated";

grant references on table "public"."interview_analysis_id" to "authenticated";

grant select on table "public"."interview_analysis_id" to "authenticated";

grant trigger on table "public"."interview_analysis_id" to "authenticated";

grant truncate on table "public"."interview_analysis_id" to "authenticated";

grant update on table "public"."interview_analysis_id" to "authenticated";

grant delete on table "public"."interview_analysis_id" to "service_role";

grant insert on table "public"."interview_analysis_id" to "service_role";

grant references on table "public"."interview_analysis_id" to "service_role";

grant select on table "public"."interview_analysis_id" to "service_role";

grant trigger on table "public"."interview_analysis_id" to "service_role";

grant truncate on table "public"."interview_analysis_id" to "service_role";

grant update on table "public"."interview_analysis_id" to "service_role";


