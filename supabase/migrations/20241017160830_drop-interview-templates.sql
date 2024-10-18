revoke delete on table "public"."interview_template" from "anon";

revoke insert on table "public"."interview_template" from "anon";

revoke references on table "public"."interview_template" from "anon";

revoke select on table "public"."interview_template" from "anon";

revoke trigger on table "public"."interview_template" from "anon";

revoke truncate on table "public"."interview_template" from "anon";

revoke update on table "public"."interview_template" from "anon";

revoke delete on table "public"."interview_template" from "authenticated";

revoke insert on table "public"."interview_template" from "authenticated";

revoke references on table "public"."interview_template" from "authenticated";

revoke select on table "public"."interview_template" from "authenticated";

revoke trigger on table "public"."interview_template" from "authenticated";

revoke truncate on table "public"."interview_template" from "authenticated";

revoke update on table "public"."interview_template" from "authenticated";

revoke delete on table "public"."interview_template" from "service_role";

revoke insert on table "public"."interview_template" from "service_role";

revoke references on table "public"."interview_template" from "service_role";

revoke select on table "public"."interview_template" from "service_role";

revoke trigger on table "public"."interview_template" from "service_role";

revoke truncate on table "public"."interview_template" from "service_role";

revoke update on table "public"."interview_template" from "service_role";

alter table "public"."campaign" drop constraint "campaigns_template_id_fkey";

alter table "public"."interview_template" drop constraint "interview_templates_hospital_id_fkey";

alter table "public"."interview_template" drop constraint "interview_templates_pkey";

drop index if exists "public"."interview_templates_pkey";

drop table "public"."interview_template";

alter table "public"."campaign" drop column "template_id";


