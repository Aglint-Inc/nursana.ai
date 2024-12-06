alter table "public"."applicant_user" add column "certification_agency" text[];

alter table "public"."applicant_user" add column "education_level" text;

alter table "public"."applicant_user" add column "employment_interest" text;

alter table "public"."applicant_user" add column "income_level" text;

alter table "public"."applicant_user" add column "licence_number" text;

alter table "public"."applicant_user" add column "licenced_year" text;

alter table "public"."applicant_user" add column "licensed_state" text;

alter table "public"."applicant_user" add column "malpractice_insurance" boolean;

alter table "public"."applicant_user" add column "memberships" text[] not null default '{}'::text[];

alter table "public"."applicant_user" add column "npi_number" text default 'NULL'::text;

alter table "public"."applicant_user" add column "patients_attend_per_week" integer;

alter table "public"."applicant_user" add column "preceptorship_interest" boolean;

alter table "public"."applicant_user" add column "professional_highlight" text;

alter table "public"."applicant_user" add column "proffessional_titles" text default ''::text;

alter table "public"."applicant_user" add column "specialties" text[] not null default '{}'::text[];

alter table "public"."applicant_user" add column "virtues" text;


