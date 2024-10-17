create type "public"."app_role" as enum ('nurse', 'hospital', 'doctor', 'therapist');

revoke delete on table "public"."nurses" from "anon";

revoke insert on table "public"."nurses" from "anon";

revoke references on table "public"."nurses" from "anon";

revoke select on table "public"."nurses" from "anon";

revoke trigger on table "public"."nurses" from "anon";

revoke truncate on table "public"."nurses" from "anon";

revoke update on table "public"."nurses" from "anon";

revoke delete on table "public"."nurses" from "authenticated";

revoke insert on table "public"."nurses" from "authenticated";

revoke references on table "public"."nurses" from "authenticated";

revoke select on table "public"."nurses" from "authenticated";

revoke trigger on table "public"."nurses" from "authenticated";

revoke truncate on table "public"."nurses" from "authenticated";

revoke update on table "public"."nurses" from "authenticated";

revoke delete on table "public"."nurses" from "service_role";

revoke insert on table "public"."nurses" from "service_role";

revoke references on table "public"."nurses" from "service_role";

revoke select on table "public"."nurses" from "service_role";

revoke trigger on table "public"."nurses" from "service_role";

revoke truncate on table "public"."nurses" from "service_role";

revoke update on table "public"."nurses" from "service_role";

revoke delete on table "public"."tenant_hospital_access" from "anon";

revoke insert on table "public"."tenant_hospital_access" from "anon";

revoke references on table "public"."tenant_hospital_access" from "anon";

revoke select on table "public"."tenant_hospital_access" from "anon";

revoke trigger on table "public"."tenant_hospital_access" from "anon";

revoke truncate on table "public"."tenant_hospital_access" from "anon";

revoke update on table "public"."tenant_hospital_access" from "anon";

revoke delete on table "public"."tenant_hospital_access" from "authenticated";

revoke insert on table "public"."tenant_hospital_access" from "authenticated";

revoke references on table "public"."tenant_hospital_access" from "authenticated";

revoke select on table "public"."tenant_hospital_access" from "authenticated";

revoke trigger on table "public"."tenant_hospital_access" from "authenticated";

revoke truncate on table "public"."tenant_hospital_access" from "authenticated";

revoke update on table "public"."tenant_hospital_access" from "authenticated";

revoke delete on table "public"."tenant_hospital_access" from "service_role";

revoke insert on table "public"."tenant_hospital_access" from "service_role";

revoke references on table "public"."tenant_hospital_access" from "service_role";

revoke select on table "public"."tenant_hospital_access" from "service_role";

revoke trigger on table "public"."tenant_hospital_access" from "service_role";

revoke truncate on table "public"."tenant_hospital_access" from "service_role";

revoke update on table "public"."tenant_hospital_access" from "service_role";

revoke delete on table "public"."tenants" from "anon";

revoke insert on table "public"."tenants" from "anon";

revoke references on table "public"."tenants" from "anon";

revoke select on table "public"."tenants" from "anon";

revoke trigger on table "public"."tenants" from "anon";

revoke truncate on table "public"."tenants" from "anon";

revoke update on table "public"."tenants" from "anon";

revoke delete on table "public"."tenants" from "authenticated";

revoke insert on table "public"."tenants" from "authenticated";

revoke references on table "public"."tenants" from "authenticated";

revoke select on table "public"."tenants" from "authenticated";

revoke trigger on table "public"."tenants" from "authenticated";

revoke truncate on table "public"."tenants" from "authenticated";

revoke update on table "public"."tenants" from "authenticated";

revoke delete on table "public"."tenants" from "service_role";

revoke insert on table "public"."tenants" from "service_role";

revoke references on table "public"."tenants" from "service_role";

revoke select on table "public"."tenants" from "service_role";

revoke trigger on table "public"."tenants" from "service_role";

revoke truncate on table "public"."tenants" from "service_role";

revoke update on table "public"."tenants" from "service_role";

revoke delete on table "public"."user_tenant_access" from "anon";

revoke insert on table "public"."user_tenant_access" from "anon";

revoke references on table "public"."user_tenant_access" from "anon";

revoke select on table "public"."user_tenant_access" from "anon";

revoke trigger on table "public"."user_tenant_access" from "anon";

revoke truncate on table "public"."user_tenant_access" from "anon";

revoke update on table "public"."user_tenant_access" from "anon";

revoke delete on table "public"."user_tenant_access" from "authenticated";

revoke insert on table "public"."user_tenant_access" from "authenticated";

revoke references on table "public"."user_tenant_access" from "authenticated";

revoke select on table "public"."user_tenant_access" from "authenticated";

revoke trigger on table "public"."user_tenant_access" from "authenticated";

revoke truncate on table "public"."user_tenant_access" from "authenticated";

revoke update on table "public"."user_tenant_access" from "authenticated";

revoke delete on table "public"."user_tenant_access" from "service_role";

revoke insert on table "public"."user_tenant_access" from "service_role";

revoke references on table "public"."user_tenant_access" from "service_role";

revoke select on table "public"."user_tenant_access" from "service_role";

revoke trigger on table "public"."user_tenant_access" from "service_role";

revoke truncate on table "public"."user_tenant_access" from "service_role";

revoke update on table "public"."user_tenant_access" from "service_role";

alter table "public"."hospitals" drop constraint "hospitals_tenant_id_fkey";

alter table "public"."interview_analysis" drop constraint "interview_analysis_nurse_id_fkey";

alter table "public"."interviews" drop constraint "fk_nurse";

alter table "public"."interviews" drop constraint "interviews_nurse_id_fkey";

alter table "public"."interviews" drop constraint "interviews_template_id_fkey";

alter table "public"."nurses" drop constraint "nurses_user_id_fkey";

alter table "public"."resumes" drop constraint "nurse_resumes_hospital_id_fkey";

alter table "public"."resumes" drop constraint "resumes_nurse_id_fkey";

alter table "public"."tenant_hospital_access" drop constraint "tenant_hospital_access_hospital_id_fkey";

alter table "public"."tenant_hospital_access" drop constraint "tenant_hospital_access_tenant_id_fkey";

alter table "public"."user_tenant_access" drop constraint "user_tenant_access_tenant_id_fkey";

alter table "public"."user_tenant_access" drop constraint "user_tenant_access_user_id_fkey";

alter table "public"."interview_analysis" drop constraint "fk_hospital";

alter table "public"."interviews" drop constraint "unique_nurse_campaign";

alter table "public"."resumes" drop constraint "nurse_resumes_nurse_id_key";

alter table "public"."nurses" drop constraint "nurses_pkey";

alter table "public"."tenant_hospital_access" drop constraint "tenant_hospital_access_pkey";

alter table "public"."tenants" drop constraint "tenants_pkey";

alter table "public"."user_tenant_access" drop constraint "user_tenant_access_pkey";

alter table "public"."hospitals" drop constraint "hospitals_pkey";

drop index if exists "public"."tenant_hospital_access_pkey";

drop index if exists "public"."tenants_pkey";

drop index if exists "public"."user_tenant_access_pkey";

drop index if exists "public"."hospitals_pkey";

drop index if exists "public"."nurse_resumes_nurse_id_key";

drop index if exists "public"."nurses_pkey";

drop index if exists "public"."unique_nurse_campaign";

drop table "public"."nurses";

drop table "public"."tenant_hospital_access";

drop table "public"."tenants";

drop table "public"."user_tenant_access";

create table "public"."roles" (
    "id" uuid not null default gen_random_uuid(),
    "user_id" uuid not null,
    "role" app_role not null
);


create table "public"."tenant" (
    "user_id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "first_name" text not null,
    "last_name" text,
    "email" text not null,
    "hospital_id" uuid
);


create table "public"."users" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text,
    "last_name" text,
    "phone_number" text,
    "profile_status" text,
    "created_at" timestamp with time zone default now(),
    "terms_accepted" boolean default false,
    "preferred_job_titles" text[] default '{}'::text[],
    "preferred_locations" text[] default '{}'::text[],
    "job_type" text,
    "travel_preference" text,
    "expected_salary" numeric
);


alter table "public"."campaigns" add column "description" text;

alter table "public"."campaigns" add column "hospital_id" uuid not null;

alter table "public"."campaigns" alter column "template_id" set not null;

alter table "public"."hospitals" drop column "hospital_id";

alter table "public"."hospitals" drop column "tenant_id";

alter table "public"."hospitals" add column "contact_number" text;

alter table "public"."hospitals" add column "created_by" uuid;

alter table "public"."hospitals" add column "id" uuid not null default gen_random_uuid();

alter table "public"."interview_analysis" drop column "nurse_id";

alter table "public"."interview_analysis" add column "call_analysis" jsonb;

alter table "public"."interview_analysis" add column "transcript" text;

alter table "public"."interview_analysis" add column "transcript_json" jsonb[];

alter table "public"."interview_analysis" add column "user_id" uuid not null;

alter table "public"."interview_templates" add column "hospital_id" uuid not null;

alter table "public"."interviews" drop column "nurse_id";

alter table "public"."interviews" drop column "template_id";

alter table "public"."interviews" drop column "template_version";

alter table "public"."interviews" add column "user_id" uuid not null;

alter table "public"."resumes" drop column "hospital_id";

alter table "public"."resumes" drop column "nurse_id";

alter table "public"."resumes" add column "campaign_id" uuid;

alter table "public"."resumes" add column "error_status" jsonb;

alter table "public"."resumes" add column "user_id" uuid not null;

CREATE UNIQUE INDEX tenant_email_key ON public.tenant USING btree (email);

CREATE UNIQUE INDEX tenant_pkey ON public.tenant USING btree (user_id);

CREATE UNIQUE INDEX user_roles_user_id_role_key ON public.roles USING btree (user_id, role);

CREATE UNIQUE INDEX users_email_key ON public.users USING btree (email);

CREATE UNIQUE INDEX hospitals_pkey ON public.hospitals USING btree (id);

CREATE UNIQUE INDEX nurse_resumes_nurse_id_key ON public.resumes USING btree (user_id);

CREATE UNIQUE INDEX nurses_pkey ON public.users USING btree (id);

CREATE UNIQUE INDEX unique_nurse_campaign ON public.interviews USING btree (user_id, campaign_id);

alter table "public"."tenant" add constraint "tenant_pkey" PRIMARY KEY using index "tenant_pkey";

alter table "public"."users" add constraint "nurses_pkey" PRIMARY KEY using index "nurses_pkey";

alter table "public"."hospitals" add constraint "hospitals_pkey" PRIMARY KEY using index "hospitals_pkey";

alter table "public"."campaigns" add constraint "campaigns_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE not valid;

alter table "public"."campaigns" validate constraint "campaigns_hospital_id_fkey";

alter table "public"."hospitals" add constraint "hospitals_created_by_fkey" FOREIGN KEY (created_by) REFERENCES tenant(user_id) ON DELETE RESTRICT not valid;

alter table "public"."hospitals" validate constraint "hospitals_created_by_fkey";

alter table "public"."interview_analysis" add constraint "interview_analysis_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."interview_analysis" validate constraint "interview_analysis_user_id_fkey";

alter table "public"."interview_templates" add constraint "interview_templates_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE not valid;

alter table "public"."interview_templates" validate constraint "interview_templates_hospital_id_fkey";

alter table "public"."interviews" add constraint "interviews_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."interviews" validate constraint "interviews_user_id_fkey";

alter table "public"."resumes" add constraint "resumes_campaign_id_fkey" FOREIGN KEY (campaign_id) REFERENCES campaigns(id) ON DELETE CASCADE not valid;

alter table "public"."resumes" validate constraint "resumes_campaign_id_fkey";

alter table "public"."resumes" add constraint "resumes_user_id_fkey" FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE not valid;

alter table "public"."resumes" validate constraint "resumes_user_id_fkey";

alter table "public"."roles" add constraint "user_roles_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."roles" validate constraint "user_roles_user_id_fkey";

alter table "public"."roles" add constraint "user_roles_user_id_role_key" UNIQUE using index "user_roles_user_id_role_key";

alter table "public"."tenant" add constraint "tenant_email_key" UNIQUE using index "tenant_email_key";

alter table "public"."tenant" add constraint "tenant_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospitals(id) ON DELETE CASCADE not valid;

alter table "public"."tenant" validate constraint "tenant_hospital_id_fkey";

alter table "public"."tenant" add constraint "tenant_user_id_fkey" FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."tenant" validate constraint "tenant_user_id_fkey";

alter table "public"."users" add constraint "users_email_key" UNIQUE using index "users_email_key";

alter table "public"."users" add constraint "users_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."users" validate constraint "users_id_fkey";

alter table "public"."interview_analysis" add constraint "fk_hospital" FOREIGN KEY (hospital_id) REFERENCES hospitals(id) not valid;

alter table "public"."interview_analysis" validate constraint "fk_hospital";

alter table "public"."interviews" add constraint "unique_nurse_campaign" UNIQUE using index "unique_nurse_campaign";

alter table "public"."resumes" add constraint "nurse_resumes_nurse_id_key" UNIQUE using index "nurse_resumes_nurse_id_key";

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
    select role into user_role from public.roles where user_id = (event->>'user_id')::uuid;

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

grant delete on table "public"."roles" to "service_role";

grant insert on table "public"."roles" to "service_role";

grant references on table "public"."roles" to "service_role";

grant select on table "public"."roles" to "service_role";

grant trigger on table "public"."roles" to "service_role";

grant truncate on table "public"."roles" to "service_role";

grant update on table "public"."roles" to "service_role";

grant delete on table "public"."roles" to "supabase_auth_admin";

grant insert on table "public"."roles" to "supabase_auth_admin";

grant references on table "public"."roles" to "supabase_auth_admin";

grant select on table "public"."roles" to "supabase_auth_admin";

grant trigger on table "public"."roles" to "supabase_auth_admin";

grant truncate on table "public"."roles" to "supabase_auth_admin";

grant update on table "public"."roles" to "supabase_auth_admin";

grant delete on table "public"."tenant" to "anon";

grant insert on table "public"."tenant" to "anon";

grant references on table "public"."tenant" to "anon";

grant select on table "public"."tenant" to "anon";

grant trigger on table "public"."tenant" to "anon";

grant truncate on table "public"."tenant" to "anon";

grant update on table "public"."tenant" to "anon";

grant delete on table "public"."tenant" to "authenticated";

grant insert on table "public"."tenant" to "authenticated";

grant references on table "public"."tenant" to "authenticated";

grant select on table "public"."tenant" to "authenticated";

grant trigger on table "public"."tenant" to "authenticated";

grant truncate on table "public"."tenant" to "authenticated";

grant update on table "public"."tenant" to "authenticated";

grant delete on table "public"."tenant" to "service_role";

grant insert on table "public"."tenant" to "service_role";

grant references on table "public"."tenant" to "service_role";

grant select on table "public"."tenant" to "service_role";

grant trigger on table "public"."tenant" to "service_role";

grant truncate on table "public"."tenant" to "service_role";

grant update on table "public"."tenant" to "service_role";

grant delete on table "public"."users" to "anon";

grant insert on table "public"."users" to "anon";

grant references on table "public"."users" to "anon";

grant select on table "public"."users" to "anon";

grant trigger on table "public"."users" to "anon";

grant truncate on table "public"."users" to "anon";

grant update on table "public"."users" to "anon";

grant delete on table "public"."users" to "authenticated";

grant insert on table "public"."users" to "authenticated";

grant references on table "public"."users" to "authenticated";

grant select on table "public"."users" to "authenticated";

grant trigger on table "public"."users" to "authenticated";

grant truncate on table "public"."users" to "authenticated";

grant update on table "public"."users" to "authenticated";

grant delete on table "public"."users" to "service_role";

grant insert on table "public"."users" to "service_role";

grant references on table "public"."users" to "service_role";

grant select on table "public"."users" to "service_role";

grant trigger on table "public"."users" to "service_role";

grant truncate on table "public"."users" to "service_role";

grant update on table "public"."users" to "service_role";

create policy "Allow auth admin to read user roles"
on "public"."roles"
as permissive
for select
to supabase_auth_admin
using (true);


CREATE TRIGGER interview_analysis AFTER UPDATE OF video_url ON public.interview_analysis FOR EACH ROW EXECUTE FUNCTION post_process_interview();


