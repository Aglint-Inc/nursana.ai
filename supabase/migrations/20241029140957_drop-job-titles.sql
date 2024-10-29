alter table "public"."preferred_job_titles" drop column "job_title";

drop type "public"."job_titles";

delete from preferred_job_titles;