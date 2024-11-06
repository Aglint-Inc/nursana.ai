create table "public"."env" (
    "key" text not null,
    "created_at" timestamp with time zone not null default now(),
    "value" text not null
);


CREATE UNIQUE INDEX env_pkey ON public.env USING btree (key);

alter table "public"."env" add constraint "env_pkey" PRIMARY KEY using index "env_pkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.get_env_value(p_key text)
 RETURNS text
 LANGUAGE plpgsql
AS $function$
DECLARE
    v_value TEXT;
BEGIN
    SELECT value INTO v_value
    FROM public.env
    WHERE key = p_key;

    IF v_value IS NULL THEN
        RAISE EXCEPTION 'Key "%" not found in env table', p_key;
    END IF;

    RETURN v_value;
END;
$function$
;
