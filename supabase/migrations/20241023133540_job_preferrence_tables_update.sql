alter table "public"."preferred_job_types" alter column "applicant_id" set not null;

alter table "public"."preferred_locations" alter column "applicant_id" set not null;

alter table "public"."preferred_job_titles" add constraint "preferred_job_titles_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_job_titles" validate constraint "preferred_job_titles_applicant_id_fkey";


