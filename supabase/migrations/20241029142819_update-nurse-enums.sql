create type "public"."nerse_titles" as enum ('registered-nurse', 'licensed-practical-nurse', 'nurse-practitioner', 'certified-registered-nurse-anesthetist', 'certified-nurse-midwife', 'clinical-nurse-specialist', 'cardiac-nurse', 'oncology-nurse', 'pediatric-nurse', 'geriatric-nurse', 'orthopedic-nurse', 'neonatal-nurse', 'perioperative-operating-room-nurse', 'emergency-trauma-nurse', 'critical-care-icu-nurse', 'psychiatric-mental-health-nurse', 'rehabilitation-nurse', 'infection-control-nurse', 'public-health-nurse', 'community-health-nurse', 'home-health-nurse', 'school-nurse', 'nurse-educator', 'nurse-researcher', 'nurse-informaticist', 'nurse-administrator-nurse-executive', 'nurse-case-manager', 'nurse-consultant', 'quality-improvement-nurse', 'forensic-nurse', 'holistic-nurse', 'telehealth-nurse', 'flight-transport-nurse', 'military-nurse', 'occupational-health-nurse', 'hospice-palliative-care-nurse');

create type "public"."nurse_license" as enum ('registered-nurse', 'nurse-practitioner', 'licensed-practical-nurse', 'clinical-nurse-specialist', 'certified-nurse-midwife', 'advanced-practice-registered-nurse', 'certified-registered-nurse-anesthetist', 'public-health-nurse', 'registered-nurse-board-certified', 'certified-nursing-assistant', 'home-health-aide', 'acute-care-nurse-practitioner', 'family-nurse-practitioner', 'pediatric-nurse-practitioner', 'adult-gerontology-nurse-practitioner', 'psychiatric-mental-health-nurse-practitioner', 'travel-nurse-license-compact-license');

alter table "public"."applicant_user" drop column "job_title";

alter table "public"."applicant_user" add column "license" nurse_license;

alter table "public"."preferred_job_titles" add column "job_titles" nerse_titles not null default 'registered-nurse'::nerse_titles;

alter table "public"."applicant_user" add column "job_title" nerse_titles not null default 'registered-nurse'::nerse_titles;
