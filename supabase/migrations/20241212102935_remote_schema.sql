create extension if not exists "wrappers" with schema "extensions";


create schema if not exists "pgmq";

create extension if not exists "pgmq" with schema "pgmq" version '1.4.4';

create type "pgmq"."message_record" as ("msg_id" bigint, "read_ct" integer, "enqueued_at" timestamp with time zone, "vt" timestamp with time zone, "message" jsonb);

create type "pgmq"."metrics_result" as ("queue_name" text, "queue_length" bigint, "newest_msg_age_sec" integer, "oldest_msg_age_sec" integer, "total_messages" bigint, "scrape_time" timestamp with time zone);

create type "pgmq"."queue_record" as ("queue_name" character varying, "is_partitioned" boolean, "is_unlogged" boolean, "created_at" timestamp with time zone);

grant select on table "pgmq"."meta" to "pg_monitor";


create table "public"."interview_scheduled" (
    "interview_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "scheduled_at" timestamp with time zone
);


CREATE UNIQUE INDEX interview_scheduled_pkey ON public.interview_scheduled USING btree (interview_id);

alter table "public"."interview_scheduled" add constraint "interview_scheduled_pkey" PRIMARY KEY using index "interview_scheduled_pkey";

alter table "public"."interview_scheduled" add constraint "interview_scheduled_interview_id_fkey" FOREIGN KEY (interview_id) REFERENCES interview(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_scheduled" validate constraint "interview_scheduled_interview_id_fkey";

set check_function_bodies = off;

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

CREATE OR REPLACE FUNCTION public.get_env_value(p_key text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_value TEXT;
BEGIN
    SELECT value INTO v_value
    FROM public.env
    WHERE key = p_key;

    IF v_value IS NULL THEN
        RAISE EXCEPTION 'Key "%" not found in env table', p_key;
    END IF;

    RETURN v_value;
END;
$function$
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
            body := json_build_object('analysis_id', NEW.id )::jsonb
        );
    RETURN NEW;
END;$function$
;

grant delete on table "public"."interview_scheduled" to "anon";

grant insert on table "public"."interview_scheduled" to "anon";

grant references on table "public"."interview_scheduled" to "anon";

grant select on table "public"."interview_scheduled" to "anon";

grant trigger on table "public"."interview_scheduled" to "anon";

grant truncate on table "public"."interview_scheduled" to "anon";

grant update on table "public"."interview_scheduled" to "anon";

grant delete on table "public"."interview_scheduled" to "authenticated";

grant insert on table "public"."interview_scheduled" to "authenticated";

grant references on table "public"."interview_scheduled" to "authenticated";

grant select on table "public"."interview_scheduled" to "authenticated";

grant trigger on table "public"."interview_scheduled" to "authenticated";

grant truncate on table "public"."interview_scheduled" to "authenticated";

grant update on table "public"."interview_scheduled" to "authenticated";

grant delete on table "public"."interview_scheduled" to "service_role";

grant insert on table "public"."interview_scheduled" to "service_role";

grant references on table "public"."interview_scheduled" to "service_role";

grant select on table "public"."interview_scheduled" to "service_role";

grant trigger on table "public"."interview_scheduled" to "service_role";

grant truncate on table "public"."interview_scheduled" to "service_role";

grant update on table "public"."interview_scheduled" to "service_role";


