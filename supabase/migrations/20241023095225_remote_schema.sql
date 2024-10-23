revoke delete on table "public"."role" from "anon";

revoke insert on table "public"."role" from "anon";

revoke references on table "public"."role" from "anon";

revoke select on table "public"."role" from "anon";

revoke trigger on table "public"."role" from "anon";

revoke truncate on table "public"."role" from "anon";

revoke update on table "public"."role" from "anon";

revoke delete on table "public"."role" from "authenticated";

revoke insert on table "public"."role" from "authenticated";

revoke references on table "public"."role" from "authenticated";

revoke select on table "public"."role" from "authenticated";

revoke trigger on table "public"."role" from "authenticated";

revoke truncate on table "public"."role" from "authenticated";

revoke update on table "public"."role" from "authenticated";

CREATE UNIQUE INDEX role_pkey ON public.role USING btree (id);

alter table "public"."role" add constraint "role_pkey" PRIMARY KEY using index "role_pkey";

set check_function_bodies = off;

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

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
AS $function$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.role where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$function$
;

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


