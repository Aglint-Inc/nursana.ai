revoke delete on table "public"."interview_analysis_id" from "anon";

revoke insert on table "public"."interview_analysis_id" from "anon";

revoke references on table "public"."interview_analysis_id" from "anon";

revoke select on table "public"."interview_analysis_id" from "anon";

revoke trigger on table "public"."interview_analysis_id" from "anon";

revoke truncate on table "public"."interview_analysis_id" from "anon";

revoke update on table "public"."interview_analysis_id" from "anon";

revoke delete on table "public"."interview_analysis_id" from "authenticated";

revoke insert on table "public"."interview_analysis_id" from "authenticated";

revoke references on table "public"."interview_analysis_id" from "authenticated";

revoke select on table "public"."interview_analysis_id" from "authenticated";

revoke trigger on table "public"."interview_analysis_id" from "authenticated";

revoke truncate on table "public"."interview_analysis_id" from "authenticated";

revoke update on table "public"."interview_analysis_id" from "authenticated";

revoke delete on table "public"."interview_analysis_id" from "service_role";

revoke insert on table "public"."interview_analysis_id" from "service_role";

revoke references on table "public"."interview_analysis_id" from "service_role";

revoke select on table "public"."interview_analysis_id" from "service_role";

revoke trigger on table "public"."interview_analysis_id" from "service_role";

revoke truncate on table "public"."interview_analysis_id" from "service_role";

revoke update on table "public"."interview_analysis_id" from "service_role";

drop table "public"."interview_analysis_id";

alter table "public"."interview_analysis" add column "google_storage_uri" text;

alter table "public"."interview_analysis" add column "video_analysis" jsonb;


