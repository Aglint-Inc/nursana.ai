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

alter table "public"."interview_analysis" add column "analysis_status" jsonb;

set check_function_bodies = off;

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


