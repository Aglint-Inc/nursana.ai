create table "public"."user_interview_rating" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "rating" integer not null,
    "feedback" text not null default ''::text,
    "applicant_id" uuid not null default gen_random_uuid()
);


CREATE UNIQUE INDEX user_interview_rating_pkey ON public.user_interview_rating USING btree (id);

alter table "public"."user_interview_rating" add constraint "user_interview_rating_pkey" PRIMARY KEY using index "user_interview_rating_pkey";

alter table "public"."user_interview_rating" add constraint "user_interview_rating_applicant_id_fkey" FOREIGN KEY (applicant_id) REFERENCES applicant(id) ON DELETE CASCADE not valid;

alter table "public"."user_interview_rating" validate constraint "user_interview_rating_applicant_id_fkey";

grant delete on table "public"."user_interview_rating" to "anon";

grant insert on table "public"."user_interview_rating" to "anon";

grant references on table "public"."user_interview_rating" to "anon";

grant select on table "public"."user_interview_rating" to "anon";

grant trigger on table "public"."user_interview_rating" to "anon";

grant truncate on table "public"."user_interview_rating" to "anon";

grant update on table "public"."user_interview_rating" to "anon";

grant delete on table "public"."user_interview_rating" to "authenticated";

grant insert on table "public"."user_interview_rating" to "authenticated";

grant references on table "public"."user_interview_rating" to "authenticated";

grant select on table "public"."user_interview_rating" to "authenticated";

grant trigger on table "public"."user_interview_rating" to "authenticated";

grant truncate on table "public"."user_interview_rating" to "authenticated";

grant update on table "public"."user_interview_rating" to "authenticated";

grant delete on table "public"."user_interview_rating" to "service_role";

grant insert on table "public"."user_interview_rating" to "service_role";

grant references on table "public"."user_interview_rating" to "service_role";

grant select on table "public"."user_interview_rating" to "service_role";

grant trigger on table "public"."user_interview_rating" to "service_role";

grant truncate on table "public"."user_interview_rating" to "service_role";

grant update on table "public"."user_interview_rating" to "service_role";


