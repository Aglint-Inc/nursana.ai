alter table "public"."locations_list" drop constraint "locations_list_place_id_key";

alter table "public"."preferred_locations" drop constraint "preferred_locations_location_id_fkey";

alter table "public"."locations_list" drop constraint "locations_list_pkey";

alter table "public"."preferred_locations" drop constraint "preferred_location_pkey";

drop index if exists "public"."locations_list_pkey";

drop index if exists "public"."locations_list_place_id_key";

drop index if exists "public"."preferred_location_pkey";

alter table "public"."locations_list" drop column "id";

alter table "public"."locations_list" alter column "place_id" set not null;

alter table "public"."preferred_locations" drop column "location_id";

alter table "public"."preferred_locations" add column "place_id" text not null;

CREATE UNIQUE INDEX preferred_locations_pkey ON public.preferred_locations USING btree (id, place_id);

CREATE UNIQUE INDEX unique_place_id ON public.locations_list USING btree (place_id);

alter table "public"."locations_list" add constraint "unique_place_id" PRIMARY KEY using index "unique_place_id";

alter table "public"."preferred_locations" add constraint "preferred_locations_pkey" PRIMARY KEY using index "preferred_locations_pkey";

alter table "public"."preferred_locations" add constraint "preferred_locations_place_id_fkey" FOREIGN KEY (place_id) REFERENCES locations_list(place_id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."preferred_locations" validate constraint "preferred_locations_place_id_fkey";


