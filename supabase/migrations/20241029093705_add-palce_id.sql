ALTER TABLE public.locations_list ADD COLUMN place_id TEXT UNIQUE;

delete from public.locations_list;