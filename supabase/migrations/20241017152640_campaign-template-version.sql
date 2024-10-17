create type "public"."campaign_status" as enum ('archived', 'active');

create type "public"."version_status" as enum ('archived', 'active');

create table "public"."template" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "hospital_id" uuid not null
);


create table "public"."version" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "ai_ending_message" text,
    "ai_instructions" text[] not null default '{}'::text[],
    "ai_interview_duration" integer not null default 30,
    "ai_questions" text,
    "ai_welcome_message" text,
    "candidate_estimated_time" text,
    "candidate_instructions" text[] not null default '{}'::text[],
    "candidate_intro_video_cover_image_url" text,
    "candidate_intro_video_url" text,
    "candidate_overview" text[] not null default '{}'::text[],
    "updated_at" timestamp with time zone not null default now(),
    "hospital_id" uuid not null,
    "template_id" uuid not null,
    "status" version_status not null default 'active'::version_status,
    "name" text not null
);


alter table "public"."campaign" add column "status" campaign_status not null default 'archived'::campaign_status;

alter table "public"."campaign" add column "version_id" uuid;

alter table "public"."interview" add column "hospital_id" uuid;

alter table "public"."interview" add column "version_id" uuid;

CREATE UNIQUE INDEX template_pkey ON public.template USING btree (id);

CREATE UNIQUE INDEX version_pkey ON public.version USING btree (id);

alter table "public"."template" add constraint "template_pkey" PRIMARY KEY using index "template_pkey";

alter table "public"."version" add constraint "version_pkey" PRIMARY KEY using index "version_pkey";

alter table "public"."campaign" add constraint "campaign_version_id_fkey" FOREIGN KEY (version_id) REFERENCES version(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."campaign" validate constraint "campaign_version_id_fkey";

alter table "public"."interview" add constraint "interview_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."interview" validate constraint "interview_hospital_id_fkey";

alter table "public"."interview" add constraint "interview_version_id_fkey" FOREIGN KEY (version_id) REFERENCES version(id) ON UPDATE CASCADE ON DELETE RESTRICT not valid;

alter table "public"."interview" validate constraint "interview_version_id_fkey";

alter table "public"."template" add constraint "template_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."template" validate constraint "template_hospital_id_fkey";

alter table "public"."version" add constraint "version_hospital_id_fkey" FOREIGN KEY (hospital_id) REFERENCES hospital(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."version" validate constraint "version_hospital_id_fkey";

alter table "public"."version" add constraint "version_template_id_fkey" FOREIGN KEY (template_id) REFERENCES template(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."version" validate constraint "version_template_id_fkey";

grant delete on table "public"."template" to "anon";

grant insert on table "public"."template" to "anon";

grant references on table "public"."template" to "anon";

grant select on table "public"."template" to "anon";

grant trigger on table "public"."template" to "anon";

grant truncate on table "public"."template" to "anon";

grant update on table "public"."template" to "anon";

grant delete on table "public"."template" to "authenticated";

grant insert on table "public"."template" to "authenticated";

grant references on table "public"."template" to "authenticated";

grant select on table "public"."template" to "authenticated";

grant trigger on table "public"."template" to "authenticated";

grant truncate on table "public"."template" to "authenticated";

grant update on table "public"."template" to "authenticated";

grant delete on table "public"."template" to "service_role";

grant insert on table "public"."template" to "service_role";

grant references on table "public"."template" to "service_role";

grant select on table "public"."template" to "service_role";

grant trigger on table "public"."template" to "service_role";

grant truncate on table "public"."template" to "service_role";

grant update on table "public"."template" to "service_role";

grant delete on table "public"."version" to "anon";

grant insert on table "public"."version" to "anon";

grant references on table "public"."version" to "anon";

grant select on table "public"."version" to "anon";

grant trigger on table "public"."version" to "anon";

grant truncate on table "public"."version" to "anon";

grant update on table "public"."version" to "anon";

grant delete on table "public"."version" to "authenticated";

grant insert on table "public"."version" to "authenticated";

grant references on table "public"."version" to "authenticated";

grant select on table "public"."version" to "authenticated";

grant trigger on table "public"."version" to "authenticated";

grant truncate on table "public"."version" to "authenticated";

grant update on table "public"."version" to "authenticated";

grant delete on table "public"."version" to "service_role";

grant insert on table "public"."version" to "service_role";

grant references on table "public"."version" to "service_role";

grant select on table "public"."version" to "service_role";

grant trigger on table "public"."version" to "service_role";

grant truncate on table "public"."version" to "service_role";

grant update on table "public"."version" to "service_role";


insert into
  template (name, hospital_id)
select
  name,
  hospital_id
from
  interview_template
group by
  name,
  hospital_id;

with
  new_version as (
    select
      interview_template.ai_ending_message,
      interview_template.ai_instructions,
      interview_template.ai_interview_duration,
      interview_template.ai_questions,
      interview_template.ai_welcome_message,
      interview_template.candidate_estimated_time,
      interview_template.candidate_instructions,
      interview_template.candidate_intro_video_cover_image_url,
      interview_template.candidate_intro_video_url,
      interview_template.candidate_overview,
      interview_template.created_at,
      interview_template.hospital_id,
      interview_template.id,
      interview_template.updated_at,
      template.id as template_id,
      'active'::version_status as status,
      'Version 1' as name
    from
      interview_template
      inner join template on interview_template.name = template.name
      and interview_template.hospital_id = template.hospital_id
  )
insert into
  version(
    ai_ending_message,
    ai_instructions,
    ai_interview_duration,
    ai_questions,
    ai_welcome_message,
    candidate_estimated_time,
    candidate_instructions,
    candidate_intro_video_cover_image_url,
    candidate_intro_video_url,
    candidate_overview,
    created_at,
    hospital_id,
    id,
    updated_at,
    template_id,
    status,
    name
  )
select
  new_version.ai_ending_message,
  new_version.ai_instructions,
  new_version.ai_interview_duration,
  new_version.ai_questions,
  new_version.ai_welcome_message,
  new_version.candidate_estimated_time,
  new_version.candidate_instructions,
  new_version.candidate_intro_video_cover_image_url,
  new_version.candidate_intro_video_url,
  new_version.candidate_overview,
  new_version.created_at,
  new_version.hospital_id,
  new_version.id,
  new_version.updated_at,
  new_version.template_id,
  new_version.status,
  new_version.name
from
  new_version;

update campaign
set version_id = c.template_id
from campaign c
where campaign.id = c.id;

update interview
set version_id = c.version_id, hospital_id = c.hospital_id
from campaign c
where interview.campaign_id = c.id;

alter table "public"."campaign" alter column "version_id" set not null;

alter table "public"."interview" alter column "hospital_id" set not null;

alter table "public"."interview" alter column "version_id" set not null;
