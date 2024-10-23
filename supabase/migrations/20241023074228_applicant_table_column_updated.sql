create type "public"."preferred_job_types" as enum ('full-time', 'part-time', 'contract', 'internship');

alter table "public"."applicant" drop column "expected_salary";

alter table "public"."applicant" drop column "job_type";

alter table "public"."applicant" add column "open_to_work" boolean not null default false;

alter table "public"."applicant" add column "preferred_job_types" preferred_job_types[];

alter table "public"."applicant" add column "salary_range" int4range;

alter table "public"."applicant" alter column "first_name" set not null;

alter table "public"."applicant" alter column "preferred_job_titles" set not null;

alter table "public"."applicant" alter column "preferred_locations" set not null;

alter table "public"."applicant" alter column "terms_accepted" set not null;

alter table "public"."applicant" alter column "travel_preference" set default '{}'::text[];

alter table "public"."applicant" alter column "travel_preference" set not null;


