alter table "public"."user_interview_rating" drop constraint "user_interview_rating_applicant_id_fkey";

drop policy "Allow auth admin to read user roles" on "public"."role";

revoke delete on table "public"."applicant" from "anon";

revoke insert on table "public"."applicant" from "anon";

revoke references on table "public"."applicant" from "anon";

revoke select on table "public"."applicant" from "anon";

revoke trigger on table "public"."applicant" from "anon";

revoke truncate on table "public"."applicant" from "anon";

revoke update on table "public"."applicant" from "anon";

revoke delete on table "public"."applicant" from "authenticated";

revoke insert on table "public"."applicant" from "authenticated";

revoke references on table "public"."applicant" from "authenticated";

revoke select on table "public"."applicant" from "authenticated";

revoke trigger on table "public"."applicant" from "authenticated";

revoke truncate on table "public"."applicant" from "authenticated";

revoke update on table "public"."applicant" from "authenticated";

revoke delete on table "public"."applicant" from "service_role";

revoke insert on table "public"."applicant" from "service_role";

revoke references on table "public"."applicant" from "service_role";

revoke select on table "public"."applicant" from "service_role";

revoke trigger on table "public"."applicant" from "service_role";

revoke truncate on table "public"."applicant" from "service_role";

revoke update on table "public"."applicant" from "service_role";

revoke delete on table "public"."hospital" from "anon";

revoke insert on table "public"."hospital" from "anon";

revoke references on table "public"."hospital" from "anon";

revoke select on table "public"."hospital" from "anon";

revoke trigger on table "public"."hospital" from "anon";

revoke truncate on table "public"."hospital" from "anon";

revoke update on table "public"."hospital" from "anon";

revoke delete on table "public"."hospital" from "authenticated";

revoke insert on table "public"."hospital" from "authenticated";

revoke references on table "public"."hospital" from "authenticated";

revoke select on table "public"."hospital" from "authenticated";

revoke trigger on table "public"."hospital" from "authenticated";

revoke truncate on table "public"."hospital" from "authenticated";

revoke update on table "public"."hospital" from "authenticated";

revoke delete on table "public"."hospital" from "service_role";

revoke insert on table "public"."hospital" from "service_role";

revoke references on table "public"."hospital" from "service_role";

revoke select on table "public"."hospital" from "service_role";

revoke trigger on table "public"."hospital" from "service_role";

revoke truncate on table "public"."hospital" from "service_role";

revoke update on table "public"."hospital" from "service_role";

revoke delete on table "public"."role" from "service_role";

revoke insert on table "public"."role" from "service_role";

revoke references on table "public"."role" from "service_role";

revoke select on table "public"."role" from "service_role";

revoke trigger on table "public"."role" from "service_role";

revoke truncate on table "public"."role" from "service_role";

revoke update on table "public"."role" from "service_role";

revoke delete on table "public"."role" from "supabase_auth_admin";

revoke insert on table "public"."role" from "supabase_auth_admin";

revoke references on table "public"."role" from "supabase_auth_admin";

revoke select on table "public"."role" from "supabase_auth_admin";

revoke trigger on table "public"."role" from "supabase_auth_admin";

revoke truncate on table "public"."role" from "supabase_auth_admin";

revoke update on table "public"."role" from "supabase_auth_admin";

revoke delete on table "public"."user" from "anon";

revoke insert on table "public"."user" from "anon";

revoke references on table "public"."user" from "anon";

revoke select on table "public"."user" from "anon";

revoke trigger on table "public"."user" from "anon";

revoke truncate on table "public"."user" from "anon";

revoke update on table "public"."user" from "anon";

revoke delete on table "public"."user" from "authenticated";

revoke insert on table "public"."user" from "authenticated";

revoke references on table "public"."user" from "authenticated";

revoke select on table "public"."user" from "authenticated";

revoke trigger on table "public"."user" from "authenticated";

revoke truncate on table "public"."user" from "authenticated";

revoke update on table "public"."user" from "authenticated";

alter table "public"."applicant" drop constraint "users_email_key";

alter table "public"."applicant" drop constraint "users_id_fkey";

alter table "public"."campaign" drop constraint "campaigns_hospital_id_fkey";

alter table "public"."hospital" drop constraint "hospitals_created_by_fkey";

alter table "public"."interview" drop constraint "interview_hospital_id_fkey";

alter table "public"."interview" drop constraint "interviews_user_id_fkey";

alter table "public"."interview_analysis" drop constraint "interview_analysis_user_id_fkey";

alter table "public"."resume" drop constraint "resumes_user_id_fkey";

alter table "public"."role" drop constraint "user_roles_user_id_fkey";

alter table "public"."role" drop constraint "user_roles_user_id_role_key";

alter table "public"."template" drop constraint "template_hospital_id_fkey";

alter table "public"."user" drop constraint "tenant_email_key";

alter table "public"."user" drop constraint "tenant_hospital_id_fkey";

alter table "public"."user" drop constraint "tenant_user_id_fkey";

alter table "public"."version" drop constraint "version_hospital_id_fkey";

alter table "public"."interview" drop constraint "unique_nurse_campaign";

alter table "public"."preferred_job_titles" drop constraint "preferred_job_titles_applicant_id_fkey";

alter table "public"."preferred_job_types" drop constraint "preferred_job_types_applicant_id_fkey";

alter table "public"."preferred_locations" drop constraint "preferred_locations_applicant_id_fkey";

alter table "public"."applicant" drop constraint "nurses_pkey";

alter table "public"."hospital" drop constraint "hospitals_pkey";

alter table "public"."role" drop constraint "role_pkey";

alter table "public"."user" drop constraint "tenant_pkey";

drop index if exists "public"."role_pkey";

drop index if exists "public"."user_roles_user_id_role_key";

drop index if exists "public"."hospitals_pkey";

drop index if exists "public"."nurses_pkey";

drop index if exists "public"."tenant_email_key";

drop index if exists "public"."tenant_pkey";

drop index if exists "public"."unique_nurse_campaign";

drop index if exists "public"."users_email_key";

drop table "public"."applicant";

drop table "public"."hospital";

drop table "public"."role";

create table "public"."agency" (
    "id" uuid not null default gen_random_uuid(),
    "name" text not null,
    "address" text,
    "contact_email" text,
    "created_at" timestamp with time zone default now(),
    "contact_number" text,
    "contact_person" uuid
);


create table "public"."agency_user" (
    "id" uuid not null,
    "first_name" text not null,
    "last_name" text,
    "email" text not null,
    "agency_id" uuid not null
);


create table "public"."applicant_user" (
    "id" uuid not null,
    "email" text not null,
    "first_name" text not null,
    "last_name" text,
    "phone_number" text,
    "created_at" timestamp with time zone default now(),
    "terms_accepted" boolean not null default false,
    "job_title" text,
    "open_to_work" boolean not null default false,
    "salary_range" int4range,
    "preferred_travel_preference" travel_preferrence
);


alter table "public"."campaign" drop column "hospital_id";

alter table "public"."campaign" add column "agency_id" uuid not null;

alter table "public"."interview" drop column "hospital_id";

alter table "public"."interview" drop column "user_id";

alter table "public"."interview" add column "agency_id" uuid not null;

alter table "public"."interview" add column "applicant_id" uuid not null;

alter table "public"."interview_analysis" drop column "user_id";

alter table "public"."interview_analysis" add column "applicant_id" uuid not null;

alter table "public"."resume" drop column "user_id";

alter table "public"."resume" add column "applicant_id" uuid not null;

alter table "public"."template" drop column "hospital_id";

alter table "public"."template" add column "agency_id" uuid not null;

alter table "public"."user" drop column "hospital_id";

alter table "public"."user" drop column "user_id";

alter table "public"."user" add column "id" uuid not null;

alter table "public"."user" add column "role" app_role not null default 'applicant'::app_role;

alter table "public"."user" alter column "created_at" set default (now() AT TIME ZONE 'utc'::text);

alter table "public"."user" alter column "email" drop not null;

alter table "public"."user" alter column "first_name" drop not null;

alter table "public"."version" drop column "hospital_id";

alter table "public"."version" add column "agency_id" uuid not null;

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

CREATE UNIQUE INDEX agency_pkey ON public.agency USING btree (id);

CREATE UNIQUE INDEX applicant_user_pkey ON public.applicant_user USING btree (id);

CREATE UNIQUE INDEX agency_user_email_key ON public.agency_user USING btree (email);

CREATE UNIQUE INDEX agency_user_pkey ON public.agency_user USING btree (id);

CREATE UNIQUE INDEX interview_applicant_id_campaig_id_key ON public.interview USING btree (applicant_id, campaign_id);

CREATE UNIQUE INDEX applicant_user_email_key ON public.applicant_user USING btree (email);

alter table "public"."agency" add constraint "agency_pkey" PRIMARY KEY using index "agency_pkey";

alter table "public"."agency_user" add constraint "agency_user_pkey" PRIMARY KEY using index "agency_user_pkey";

alter table "public"."applicant_user" add constraint "applicant_user_pkey" PRIMARY KEY using index "applicant_user_pkey";

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."agency" add constraint "agency_contact_person_fkey" FOREIGN KEY (contact_person) REFERENCES agency_user(id) ON UPDATE CASCADE ON DELETE SET NULL not valid;

alter table "public"."agency" validate constraint "agency_contact_person_fkey";

alter table "public"."agency_user" add constraint "agency_user_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agency(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."agency_user" validate constraint "agency_user_agency_id_fkey";

alter table "public"."agency_user" add constraint "agency_user_id_fkey" FOREIGN KEY (id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."agency_user" validate constraint "agency_user_id_fkey";

alter table "public"."agency_user" add constraint "agency_user_email_key" UNIQUE using index "agency_user_email_key";

alter table "public"."applicant_user" add constraint "applicant_user_id_fkey" FOREIGN KEY (id) REFERENCES "user"(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."applicant_user" validate constraint "applicant_user_id_fkey";

alter table "public"."applicant_user" add constraint "applicant_user_email_key" UNIQUE using index "applicant_user_email_key";

alter table "public"."campaign" add constraint "campaign_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agency(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."campaign" validate constraint "campaign_agency_id_fkey";

alter table "public"."interview" add constraint "interview_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agency(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview" validate constraint "interview_agency_id_fkey";

alter table "public"."interview" add constraint "interview_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview" validate constraint "interview_applicant_id_fkey";

alter table "public"."interview_analysis" add constraint "interview_analysis_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview_analysis" validate constraint "interview_analysis_applicant_id_fkey";

alter table "public"."resume" add constraint "resume_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."resume" validate constraint "resume_applicant_id_fkey";

alter table "public"."template" add constraint "template_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agency(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template" validate constraint "template_agency_id_fkey";

alter table "public"."user" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."user" validate constraint "user_id_fkey";

alter table "public"."version" add constraint "version_agency_id_fkey" FOREIGN KEY (agency_id) REFERENCES agency(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."version" validate constraint "version_agency_id_fkey";

alter table "public"."interview" add constraint "interview_applicant_id_campaig_id_key" UNIQUE using index "interview_applicant_id_campaig_id_key";

alter table "public"."preferred_job_titles" add constraint "preferred_job_titles_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_job_titles" validate constraint "preferred_job_titles_applicant_id_fkey";

alter table "public"."preferred_job_types" add constraint "preferred_job_types_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_job_types" validate constraint "preferred_job_types_applicant_id_fkey";

alter table "public"."preferred_locations" add constraint "preferred_locations_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_locations" validate constraint "preferred_locations_applicant_id_fkey";

grant delete on table "public"."agency" to "anon";

grant insert on table "public"."agency" to "anon";

grant references on table "public"."agency" to "anon";

grant select on table "public"."agency" to "anon";

grant trigger on table "public"."agency" to "anon";

grant truncate on table "public"."agency" to "anon";

grant update on table "public"."agency" to "anon";

grant delete on table "public"."agency" to "authenticated";

grant insert on table "public"."agency" to "authenticated";

grant references on table "public"."agency" to "authenticated";

grant select on table "public"."agency" to "authenticated";

grant trigger on table "public"."agency" to "authenticated";

grant truncate on table "public"."agency" to "authenticated";

grant update on table "public"."agency" to "authenticated";

grant delete on table "public"."agency" to "service_role";

grant insert on table "public"."agency" to "service_role";

grant references on table "public"."agency" to "service_role";

grant select on table "public"."agency" to "service_role";

grant trigger on table "public"."agency" to "service_role";

grant truncate on table "public"."agency" to "service_role";

grant update on table "public"."agency" to "service_role";

grant delete on table "public"."agency_user" to "anon";

grant insert on table "public"."agency_user" to "anon";

grant references on table "public"."agency_user" to "anon";

grant select on table "public"."agency_user" to "anon";

grant trigger on table "public"."agency_user" to "anon";

grant truncate on table "public"."agency_user" to "anon";

grant update on table "public"."agency_user" to "anon";

grant delete on table "public"."agency_user" to "authenticated";

grant insert on table "public"."agency_user" to "authenticated";

grant references on table "public"."agency_user" to "authenticated";

grant select on table "public"."agency_user" to "authenticated";

grant trigger on table "public"."agency_user" to "authenticated";

grant truncate on table "public"."agency_user" to "authenticated";

grant update on table "public"."agency_user" to "authenticated";

grant delete on table "public"."agency_user" to "service_role";

grant insert on table "public"."agency_user" to "service_role";

grant references on table "public"."agency_user" to "service_role";

grant select on table "public"."agency_user" to "service_role";

grant trigger on table "public"."agency_user" to "service_role";

grant truncate on table "public"."agency_user" to "service_role";

grant update on table "public"."agency_user" to "service_role";

grant delete on table "public"."applicant_user" to "anon";

grant insert on table "public"."applicant_user" to "anon";

grant references on table "public"."applicant_user" to "anon";

grant select on table "public"."applicant_user" to "anon";

grant trigger on table "public"."applicant_user" to "anon";

grant truncate on table "public"."applicant_user" to "anon";

grant update on table "public"."applicant_user" to "anon";

grant delete on table "public"."applicant_user" to "authenticated";

grant insert on table "public"."applicant_user" to "authenticated";

grant references on table "public"."applicant_user" to "authenticated";

grant select on table "public"."applicant_user" to "authenticated";

grant trigger on table "public"."applicant_user" to "authenticated";

grant truncate on table "public"."applicant_user" to "authenticated";

grant update on table "public"."applicant_user" to "authenticated";

grant delete on table "public"."applicant_user" to "service_role";

grant insert on table "public"."applicant_user" to "service_role";

grant references on table "public"."applicant_user" to "service_role";

grant select on table "public"."applicant_user" to "service_role";

grant trigger on table "public"."applicant_user" to "service_role";

grant truncate on table "public"."applicant_user" to "service_role";

grant update on table "public"."applicant_user" to "service_role";

grant delete on table "public"."user" to "supabase_auth_admin";

grant insert on table "public"."user" to "supabase_auth_admin";

grant references on table "public"."user" to "supabase_auth_admin";

grant select on table "public"."user" to "supabase_auth_admin";

grant trigger on table "public"."user" to "supabase_auth_admin";

grant truncate on table "public"."user" to "supabase_auth_admin";

grant update on table "public"."user" to "supabase_auth_admin";

grant delete on table "public"."user" to "anon";

grant insert on table "public"."user" to "anon";

grant references on table "public"."user" to "anon";

grant select on table "public"."user" to "anon";

grant trigger on table "public"."user" to "anon";

grant truncate on table "public"."user" to "anon";

grant update on table "public"."user" to "anon";

grant delete on table "public"."user" to "authenticated";

grant insert on table "public"."user" to "authenticated";

grant references on table "public"."user" to "authenticated";

grant select on table "public"."user" to "authenticated";

grant trigger on table "public"."user" to "authenticated";

grant truncate on table "public"."user" to "authenticated";

grant update on table "public"."user" to "authenticated";

grant delete on table "public"."user" to "service_role";

grant insert on table "public"."user" to "service_role";

grant references on table "public"."user" to "service_role";

grant select on table "public"."user" to "service_role";

grant trigger on table "public"."user" to "service_role";

grant truncate on table "public"."user" to "service_role";

grant update on table "public"."user" to "service_role";


create policy "Allow auth admin to read user roles"
on "public"."user"
as permissive
for select
to supabase_auth_admin
using (true);

update public."user"
set
  first_name = agency_user.first_name,
  last_name = agency_user.last_name,
  email = agency_user.email
from
  agency_user
where
  public."user".id = agency_user.id;

alter table agency_user
drop column if exists first_name,
drop column if exists last_name,
drop column if exists email;

update public."user"
set
  first_name = applicant_user.first_name,
  last_name = applicant_user.last_name,
  email = applicant_user.email
from
  applicant_user
where
  public."user".id = applicant_user.id;

alter table applicant_user
drop column if exists first_name,
drop column if exists last_name,
drop column if exists email;

create type "public"."user_role" as enum ('applicant_user', 'agency_user');

alter table "public"."agency" drop constraint "agency_contact_person_fkey";

alter table "public"."agency" drop column "contact_person";

alter table "public"."user" add column "user_role" user_role not null default 'applicant_user'::user_role;

alter table "public"."user" alter column "email" set not null;

alter table "public"."user" alter column "first_name" set not null;

alter table "public"."user" alter column "last_name" set default ''::text;

alter table "public"."user" alter column "last_name" set not null;

CREATE UNIQUE INDEX user_email_key ON public."user" USING btree (email);

alter table "public"."user" add constraint "user_email_key" UNIQUE using index "user_email_key";

update public."user"
set
  user_role = 'agency_user'::user_role
where
  public."user".role <> 'applicant'::app_role;

alter table public."user"
drop column if exists role;

drop type "public"."app_role";

ALTER TABLE campaign RENAME CONSTRAINT campaigns_pkey TO campaign_pkey;

ALTER TABLE campaign RENAME CONSTRAINT campaigns_campaign_code_key TO campaign_campaign_code_key;

--

ALTER TABLE interview RENAME CONSTRAINT interviews_pkey TO interview_pkey;

ALTER TABLE interview RENAME CONSTRAINT interview_applicant_id_campaig_id_key TO interview_applicant_id_campaign_id_key;

ALTER TABLE interview RENAME CONSTRAINT interviews_campaign_id_fkey TO interview_campaign_id_fkey;

--

ALTER TABLE interview_analysis RENAME CONSTRAINT nurse_video_interview_analysis_pkey TO interview_analysis_pkey;

ALTER TABLE interview_analysis RENAME CONSTRAINT unique_interview_analysis TO interview_analysis_interview_id_key;

ALTER TABLE interview_analysis RENAME CONSTRAINT fk_interview TO interview_analysis_interview_id_fkey;

--

ALTER TABLE preferred_job_titles RENAME CONSTRAINT preferred_job_titles_pkey TO preferred_job_title_pkey;

ALTER TABLE preferred_job_titles RENAME CONSTRAINT preferred_job_titles_applicant_id_fkey TO preferred_job_title_applicant_id_fkey;

--

ALTER TABLE preferred_job_types RENAME CONSTRAINT preferred_job_types_as_pkey TO preferred_job_type_pkey;

ALTER TABLE preferred_job_types RENAME CONSTRAINT preferred_job_types_applicant_id_fkey TO preferred_job_type_applicant_id_fkey;

--

ALTER TABLE preferred_locations RENAME CONSTRAINT preferred_locations_pkey TO preferred_location_pkey;

ALTER TABLE preferred_locations RENAME CONSTRAINT preferred_locations_applicant_id_fkey TO preferred_location_applicant_id_fkey;

--

ALTER TABLE resume RENAME CONSTRAINT resumes_campaign_id_fkey TO resume_campaign_id_fkey;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
AS $function$
  declare
    claims jsonb;
    user_role public.user_role;
  begin

    select public.user.user_role into user_role from public.user where id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    event := jsonb_set(event, '{claims}', claims);

    return event;

  end;
$function$
;




alter table "public"."user_interview_rating" add constraint "user_interview_rating_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant_user(id) ON DELETE CASCADE not valid;

alter table "public"."user_interview_rating" validate constraint "user_interview_rating_applicant_id_fkey";