create table "public"."locations_list" (
    "id" uuid not null default gen_random_uuid(),
    "city" text not null,
    "state" text not null,
    "country" text not null,
    "level" text not null
);


alter table "public"."preferred_locations" drop column "city";

alter table "public"."preferred_locations" drop column "country";

alter table "public"."preferred_locations" drop column "state";

alter table "public"."preferred_locations" add column "location_id" uuid not null;

CREATE UNIQUE INDEX locations_list_pkey ON public.locations_list USING btree (id);

alter table "public"."locations_list" add constraint "locations_list_pkey" PRIMARY KEY using index "locations_list_pkey";

alter table "public"."preferred_locations" add constraint "preferred_locations_location_id_fkey" FOREIGN KEY (location_id) REFERENCES locations_list(id) ON DELETE CASCADE not valid;

alter table "public"."preferred_locations" validate constraint "preferred_locations_location_id_fkey";

grant delete on table "public"."locations_list" to "anon";

grant insert on table "public"."locations_list" to "anon";

grant references on table "public"."locations_list" to "anon";

grant select on table "public"."locations_list" to "anon";

grant trigger on table "public"."locations_list" to "anon";

grant truncate on table "public"."locations_list" to "anon";

grant update on table "public"."locations_list" to "anon";

grant delete on table "public"."locations_list" to "authenticated";

grant insert on table "public"."locations_list" to "authenticated";

grant references on table "public"."locations_list" to "authenticated";

grant select on table "public"."locations_list" to "authenticated";

grant trigger on table "public"."locations_list" to "authenticated";

grant truncate on table "public"."locations_list" to "authenticated";

grant update on table "public"."locations_list" to "authenticated";

grant delete on table "public"."locations_list" to "service_role";

grant insert on table "public"."locations_list" to "service_role";

grant references on table "public"."locations_list" to "service_role";

grant select on table "public"."locations_list" to "service_role";

grant trigger on table "public"."locations_list" to "service_role";

grant truncate on table "public"."locations_list" to "service_role";

grant update on table "public"."locations_list" to "service_role";


