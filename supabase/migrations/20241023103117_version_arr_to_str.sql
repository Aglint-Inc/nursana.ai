alter table "public"."version" alter column "ai_instructions" set data type text using "ai_instructions"::text;

alter table "public"."version" alter column "candidate_instructions" set data type text using "candidate_instructions"::text;

alter table "public"."version" alter column "candidate_overview" set data type text using "candidate_overview"::text;


