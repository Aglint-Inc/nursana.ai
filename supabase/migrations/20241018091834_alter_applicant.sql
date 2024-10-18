alter table "public"."applicant" alter column "expected_salary" set data type text using "expected_salary"::text;

alter table "public"."applicant" alter column "job_type" set data type text[] using "job_type"::text[];

alter table "public"."applicant" alter column "travel_preference" set data type text[] using "travel_preference"::text[];


