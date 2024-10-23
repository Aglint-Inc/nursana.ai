create type "public"."job_titles" as enum ('registered-nurse', 'nurse-practitioner', 'licensed-practical-nurse', 'clinical-nurse-specialist', 'certified-nurse-midwife');

create type "public"."job_types" as enum ('full-time', 'part-time', 'contract', 'internship');

create type "public"."travel_preferrence" as enum ('no-travel', 'occasional-travel', 'frequent-travel', 'up-to-50-travel', 'up-to-75-travel', '100-travel');

create table "public"."preferred_job_titles" (
    "applicant_id" uuid not null default gen_random_uuid(),
    "job_title" job_titles not null,
    "id" uuid not null
);


alter table "public"."preferred_job_titles" enable row level security;

create table "public"."preferred_job_types" (
    "id" uuid not null default gen_random_uuid(),
    "applicant_id" uuid,
    "job_type" job_types
);


alter table "public"."preferred_job_types" enable row level security;

create table "public"."preferred_locations" (
    "applicant_id" uuid,
    "city" text,
    "state" text,
    "country" text,
    "id" uuid not null
);


alter table "public"."preferred_locations" enable row level security;

alter table "public"."applicant" drop column "preferred_job_titles";

alter table "public"."applicant" drop column "preferred_job_types";

alter table "public"."applicant" drop column "preferred_locations";

alter table "public"."applicant" drop column "travel_preference";

alter table "public"."applicant" add column "preferred_travel_preference" travel_preferrence;

drop type "public"."preferred_job_types";

CREATE UNIQUE INDEX preferred_job_titles_pkey ON public.preferred_job_titles USING btree (id);

CREATE UNIQUE INDEX preferred_job_types_as_pkey ON public.preferred_job_types USING btree (id);

CREATE UNIQUE INDEX preferred_locations_pkey ON public.preferred_locations USING btree (id);

alter table "public"."preferred_job_titles" add constraint "preferred_job_titles_pkey" PRIMARY KEY using index "preferred_job_titles_pkey";

alter table "public"."preferred_job_types" add constraint "preferred_job_types_as_pkey" PRIMARY KEY using index "preferred_job_types_as_pkey";

alter table "public"."preferred_locations" add constraint "preferred_locations_pkey" PRIMARY KEY using index "preferred_locations_pkey";

alter table "public"."preferred_job_types" add constraint "preferred_job_types_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_job_types" validate constraint "preferred_job_types_applicant_id_fkey";

alter table "public"."preferred_locations" add constraint "preferred_locations_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_locations" validate constraint "preferred_locations_applicant_id_fkey";

grant delete on table "public"."preferred_job_titles" to "anon";

grant insert on table "public"."preferred_job_titles" to "anon";

grant references on table "public"."preferred_job_titles" to "anon";

grant select on table "public"."preferred_job_titles" to "anon";

grant trigger on table "public"."preferred_job_titles" to "anon";

grant truncate on table "public"."preferred_job_titles" to "anon";

grant update on table "public"."preferred_job_titles" to "anon";

grant delete on table "public"."preferred_job_titles" to "authenticated";

grant insert on table "public"."preferred_job_titles" to "authenticated";

grant references on table "public"."preferred_job_titles" to "authenticated";

grant select on table "public"."preferred_job_titles" to "authenticated";

grant trigger on table "public"."preferred_job_titles" to "authenticated";

grant truncate on table "public"."preferred_job_titles" to "authenticated";

grant update on table "public"."preferred_job_titles" to "authenticated";

grant delete on table "public"."preferred_job_titles" to "service_role";

grant insert on table "public"."preferred_job_titles" to "service_role";

grant references on table "public"."preferred_job_titles" to "service_role";

grant select on table "public"."preferred_job_titles" to "service_role";

grant trigger on table "public"."preferred_job_titles" to "service_role";

grant truncate on table "public"."preferred_job_titles" to "service_role";

grant update on table "public"."preferred_job_titles" to "service_role";

grant delete on table "public"."preferred_job_types" to "anon";

grant insert on table "public"."preferred_job_types" to "anon";

grant references on table "public"."preferred_job_types" to "anon";

grant select on table "public"."preferred_job_types" to "anon";

grant trigger on table "public"."preferred_job_types" to "anon";

grant truncate on table "public"."preferred_job_types" to "anon";

grant update on table "public"."preferred_job_types" to "anon";

grant delete on table "public"."preferred_job_types" to "authenticated";

grant insert on table "public"."preferred_job_types" to "authenticated";

grant references on table "public"."preferred_job_types" to "authenticated";

grant select on table "public"."preferred_job_types" to "authenticated";

grant trigger on table "public"."preferred_job_types" to "authenticated";

grant truncate on table "public"."preferred_job_types" to "authenticated";

grant update on table "public"."preferred_job_types" to "authenticated";

grant delete on table "public"."preferred_job_types" to "service_role";

grant insert on table "public"."preferred_job_types" to "service_role";

grant references on table "public"."preferred_job_types" to "service_role";

grant select on table "public"."preferred_job_types" to "service_role";

grant trigger on table "public"."preferred_job_types" to "service_role";

grant truncate on table "public"."preferred_job_types" to "service_role";

grant update on table "public"."preferred_job_types" to "service_role";

grant delete on table "public"."preferred_locations" to "anon";

grant insert on table "public"."preferred_locations" to "anon";

grant references on table "public"."preferred_locations" to "anon";

grant select on table "public"."preferred_locations" to "anon";

grant trigger on table "public"."preferred_locations" to "anon";

grant truncate on table "public"."preferred_locations" to "anon";

grant update on table "public"."preferred_locations" to "anon";

grant delete on table "public"."preferred_locations" to "authenticated";

grant insert on table "public"."preferred_locations" to "authenticated";

grant references on table "public"."preferred_locations" to "authenticated";

grant select on table "public"."preferred_locations" to "authenticated";

grant trigger on table "public"."preferred_locations" to "authenticated";

grant truncate on table "public"."preferred_locations" to "authenticated";

grant update on table "public"."preferred_locations" to "authenticated";

grant delete on table "public"."preferred_locations" to "service_role";

grant insert on table "public"."preferred_locations" to "service_role";

grant references on table "public"."preferred_locations" to "service_role";

grant select on table "public"."preferred_locations" to "service_role";

grant trigger on table "public"."preferred_locations" to "service_role";

grant truncate on table "public"."preferred_locations" to "service_role";

grant update on table "public"."preferred_locations" to "service_role";


