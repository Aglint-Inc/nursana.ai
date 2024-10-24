alter table "public"."applicant" drop column "job_title";

alter table "public"."applicant" add column "current_job_title" job_titles not null default 'nurse-practitioner'::job_titles;


