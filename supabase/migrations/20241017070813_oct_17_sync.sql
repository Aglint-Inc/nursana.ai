

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE EXTENSION IF NOT EXISTS "pg_net" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";






COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";






CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";






CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";






CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";






CREATE TYPE "public"."app_role" AS ENUM (
    'applicant',
    'user'
);


ALTER TYPE "public"."app_role" OWNER TO "postgres";


CREATE TYPE "public"."interview_stage" AS ENUM (
    'not_started',
    'resume_submitted',
    'interview_inprogress',
    'interview_completed'
);


ALTER TYPE "public"."interview_stage" OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") RETURNS "uuid"
    LANGUAGE "plpgsql"
    AS $$
DECLARE
    v_campaign_id UUID;
    v_template_id UUID;
    v_template_version INTEGER;
    v_interview_id UUID;
    v_campaign_name TEXT;
    v_nurse_id UUID;
BEGIN
    -- Get campaign details
    SELECT id, template_id, template_version, name
    INTO v_campaign_id, v_template_id, v_template_version, v_campaign_name
    FROM campaigns
    WHERE campaign_code = p_campaign_code;

    IF v_campaign_id IS NULL THEN
        RAISE EXCEPTION 'Campaign not found with code: %', p_campaign_code;
    END IF;

    -- Check if nurse exists, if not create one
    SELECT nurse_id INTO v_nurse_id
    FROM nurses
    WHERE nurse_id = p_nurse_id::UUID;

    IF v_nurse_id IS NULL THEN
        INSERT INTO nurses (nurse_id, profile_status)
        VALUES (p_nurse_id::UUID, 'initial')
        RETURNING nurse_id INTO v_nurse_id;
    END IF;

    -- Check if an interview already exists
    SELECT id INTO v_interview_id
    FROM interviews
    WHERE campaign_id = v_campaign_id AND nurse_id = v_nurse_id;

    -- If an interview exists, return its ID
    IF v_interview_id IS NOT NULL THEN
        RETURN v_interview_id;
    END IF;

    -- If no interview exists, create a new one
    INSERT INTO interviews (
        campaign_id,
        nurse_id,
        template_id,
        template_version,
        campaign_code,
        name,
        ai_ending_message,
        ai_instructions,
        ai_interview_duration,
        ai_questions,
        ai_welcome_message,
        candidate_estimated_time,
        candidate_instructions,
        candidate_intro_video_cover_image_url,
        candidate_intro_video_url,
        candidate_overview,
        candidate_form,
        interview_stage
    )
    SELECT
        v_campaign_id,
        v_nurse_id,
        v_template_id,
        v_template_version,
        p_campaign_code,
        v_campaign_name || ' - Interview',
        t.ai_ending_message,
        t.ai_instructions,
        t.ai_interview_duration,
        t.ai_questions,
        t.ai_welcome_message,
        t.candidate_estimated_time,
        t.candidate_instructions,
        t.candidate_intro_video_cover_image_url,
        t.candidate_intro_video_url,
        t.candidate_overview,
        t.candidate_form,
        p_interview_stage::interview_stage  -- Cast to interview_stage type
    FROM interview_templates t
    WHERE t.id = v_template_id AND t.version = v_template_version AND t.status = 'published'
    RETURNING id INTO v_interview_id;

    RETURN v_interview_id;
END;
$$;


ALTER FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."custom_access_token_hook"("event" "jsonb") RETURNS "jsonb"
    LANGUAGE "plpgsql" STABLE
    AS $$
  declare
    claims jsonb;
    user_role public.app_role;
  begin
    -- Fetch the user role in the user_roles table
    select role into user_role from public.role where user_id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      -- Set the claim
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    -- Update the 'claims' object in the original event
    event := jsonb_set(event, '{claims}', claims);

    -- Return the modified or original event
    return event;
  end;
$$;


ALTER FUNCTION "public"."custom_access_token_hook"("event" "jsonb") OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."increment_template_version"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    IF OLD.status = 'published' AND NEW.status = 'published' THEN
        NEW.version = OLD.version + 1;
        NEW.published_version = NEW.version;
    ELSIF OLD.status = 'draft' AND NEW.status = 'published' THEN
        NEW.published_version = NEW.version;
    ELSIF NEW.status = 'draft' THEN
        NEW.version = OLD.version + 1;
    END IF;
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."increment_template_version"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."post_process_interview"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$BEGIN
    PERFORM net.http_post(
        url := 'https://nursana.ai/api/backup-interview-data',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('interview_analysis_id', NEW.id)::jsonb
    );
    RETURN NEW;
END;$$;


ALTER FUNCTION "public"."post_process_interview"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."score_resume_trigger_function"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
    DECLARE
        interview_analysis_id UUID;
    BEGIN
        SELECT interview_analysis.id
        INTO interview_analysis_id FROM public.interviews JOIN public.interview_analysis ON public.interview_analysis.interview_id = public.interviews.id WHERE public.interviews.user_id = NEW.user_id;
        PERFORM net.http_post(
            url := 'https://nursana.ai/api/score_resume',
            headers := '{"Content-Type": "application/json"}'::jsonb,
            body := json_build_object('interview_analysis_id', interview_analysis_id, 'resume_json', new.structured_resume)::jsonb
        );
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."score_resume_trigger_function"() OWNER TO "postgres";


CREATE OR REPLACE FUNCTION "public"."update_modified_column"() RETURNS "trigger"
    LANGUAGE "plpgsql"
    AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;


ALTER FUNCTION "public"."update_modified_column"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."applicant" (
    "id" "uuid" NOT NULL,
    "email" "text" NOT NULL,
    "first_name" "text",
    "last_name" "text",
    "phone_number" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "terms_accepted" boolean DEFAULT false,
    "preferred_job_titles" "text"[] DEFAULT '{}'::"text"[],
    "preferred_locations" "text"[] DEFAULT '{}'::"text"[],
    "job_type" "text",
    "travel_preference" "text",
    "expected_salary" numeric,
    "job_title" "text"
);


ALTER TABLE "public"."applicant" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."campaign" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "campaign_code" "text" NOT NULL,
    "template_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "description" "text",
    "hospital_id" "uuid" NOT NULL
);


ALTER TABLE "public"."campaign" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."hospital" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "hospital_name" "text" NOT NULL,
    "address" "text",
    "contact_person" "text",
    "contact_email" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "created_by" "uuid",
    "contact_number" "text"
);


ALTER TABLE "public"."hospital" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interview" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "campaign_id" "uuid" NOT NULL,
    "user_id" "uuid" NOT NULL,
    "name" "text" NOT NULL,
    "ai_ending_message" "text",
    "ai_instructions" "text"[],
    "ai_interview_duration" integer DEFAULT 30 NOT NULL,
    "ai_questions" "text",
    "ai_welcome_message" "text",
    "candidate_estimated_time" "text",
    "candidate_instructions" "text"[],
    "candidate_intro_video_cover_image_url" "text",
    "candidate_intro_video_url" "text",
    "candidate_overview" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "interview_stage" "public"."interview_stage" DEFAULT 'not_started'::"public"."interview_stage" NOT NULL,
    CONSTRAINT "check_valid_stages" CHECK (("interview_stage" = ANY (ARRAY['not_started'::"public"."interview_stage", 'resume_submitted'::"public"."interview_stage", 'interview_inprogress'::"public"."interview_stage", 'interview_completed'::"public"."interview_stage"])))
);


ALTER TABLE "public"."interview" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interview_analysis" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "audio_url" "text",
    "video_url" "text",
    "transcript_url" "text",
    "structured_analysis" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "call_id" "text",
    "interview_id" "uuid" NOT NULL,
    "call_analysis" "jsonb",
    "transcript" "text",
    "transcript_json" "jsonb"[]
);


ALTER TABLE "public"."interview_analysis" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."interview_template" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "ai_ending_message" "text",
    "ai_instructions" "text"[],
    "ai_interview_duration" integer DEFAULT 30 NOT NULL,
    "ai_questions" "text",
    "ai_welcome_message" "text",
    "candidate_estimated_time" "text",
    "candidate_instructions" "text"[],
    "candidate_intro_video_cover_image_url" "text",
    "candidate_intro_video_url" "text",
    "candidate_overview" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "hospital_id" "uuid" NOT NULL
);


ALTER TABLE "public"."interview_template" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."resume" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "file_url" "text" NOT NULL,
    "structured_resume" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "error_status" "jsonb",
    "campaign_id" "uuid" NOT NULL
);


ALTER TABLE "public"."resume" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."role" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "user_id" "uuid" NOT NULL,
    "role" "public"."app_role" NOT NULL
);


ALTER TABLE "public"."role" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."user" (
    "user_id" "uuid" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"() NOT NULL,
    "first_name" "text" NOT NULL,
    "last_name" "text",
    "email" "text" NOT NULL,
    "hospital_id" "uuid" NOT NULL
);


ALTER TABLE "public"."user" OWNER TO "postgres";


ALTER TABLE ONLY "public"."campaign"
    ADD CONSTRAINT "campaigns_campaign_code_key" UNIQUE ("campaign_code");



ALTER TABLE ONLY "public"."campaign"
    ADD CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."hospital"
    ADD CONSTRAINT "hospitals_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interview_template"
    ADD CONSTRAINT "interview_templates_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interview"
    ADD CONSTRAINT "interviews_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."resume"
    ADD CONSTRAINT "nurse_resumes_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "nurse_video_interview_analysis_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."applicant"
    ADD CONSTRAINT "nurses_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "tenant_email_key" UNIQUE ("email");



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "tenant_pkey" PRIMARY KEY ("user_id");



ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "unique_interview_analysis" UNIQUE ("interview_id");



ALTER TABLE ONLY "public"."interview"
    ADD CONSTRAINT "unique_nurse_campaign" UNIQUE ("user_id", "campaign_id");



ALTER TABLE ONLY "public"."role"
    ADD CONSTRAINT "user_roles_user_id_role_key" UNIQUE ("user_id", "role");



ALTER TABLE ONLY "public"."applicant"
    ADD CONSTRAINT "users_email_key" UNIQUE ("email");



CREATE OR REPLACE TRIGGER "interview_analysis" AFTER UPDATE OF "video_url" ON "public"."interview_analysis" FOR EACH ROW EXECUTE FUNCTION "public"."post_process_interview"();



CREATE OR REPLACE TRIGGER "score_resume_trigger" AFTER UPDATE OF "structured_resume" ON "public"."resume" FOR EACH ROW WHEN (("new"."structured_resume" IS NOT NULL)) EXECUTE FUNCTION "public"."score_resume_trigger_function"();



CREATE OR REPLACE TRIGGER "update_interview_analysis_modtime" BEFORE UPDATE ON "public"."interview_analysis" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();



CREATE OR REPLACE TRIGGER "update_resumes_modtime" BEFORE UPDATE ON "public"."resume" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();



ALTER TABLE ONLY "public"."campaign"
    ADD CONSTRAINT "campaigns_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."campaign"
    ADD CONSTRAINT "campaigns_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."interview_template"("id");



ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "fk_interview" FOREIGN KEY ("interview_id") REFERENCES "public"."interview"("id");



ALTER TABLE ONLY "public"."hospital"
    ADD CONSTRAINT "hospitals_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "public"."user"("user_id") ON DELETE RESTRICT;



ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "interview_analysis_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."applicant"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."interview_template"
    ADD CONSTRAINT "interview_templates_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."interview"
    ADD CONSTRAINT "interviews_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign"("id") ON DELETE SET NULL;



ALTER TABLE ONLY "public"."interview"
    ADD CONSTRAINT "interviews_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."applicant"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resume"
    ADD CONSTRAINT "resumes_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaign"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."resume"
    ADD CONSTRAINT "resumes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."applicant"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "tenant_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospital"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."user"
    ADD CONSTRAINT "tenant_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."role"
    ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."applicant"
    ADD CONSTRAINT "users_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



CREATE POLICY "Allow auth admin to read user roles" ON "public"."role" FOR SELECT TO "supabase_auth_admin" USING (true);





ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";





GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";
GRANT USAGE ON SCHEMA "public" TO "supabase_auth_admin";


























































































































































































GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "service_role";



REVOKE ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") FROM PUBLIC;
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "service_role";
GRANT ALL ON FUNCTION "public"."custom_access_token_hook"("event" "jsonb") TO "supabase_auth_admin";



GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "anon";
GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "service_role";



GRANT ALL ON FUNCTION "public"."post_process_interview"() TO "anon";
GRANT ALL ON FUNCTION "public"."post_process_interview"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."post_process_interview"() TO "service_role";



GRANT ALL ON FUNCTION "public"."score_resume_trigger_function"() TO "anon";
GRANT ALL ON FUNCTION "public"."score_resume_trigger_function"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."score_resume_trigger_function"() TO "service_role";



GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "service_role";


















GRANT ALL ON TABLE "public"."applicant" TO "anon";
GRANT ALL ON TABLE "public"."applicant" TO "authenticated";
GRANT ALL ON TABLE "public"."applicant" TO "service_role";



GRANT ALL ON TABLE "public"."campaign" TO "anon";
GRANT ALL ON TABLE "public"."campaign" TO "authenticated";
GRANT ALL ON TABLE "public"."campaign" TO "service_role";



GRANT ALL ON TABLE "public"."hospital" TO "anon";
GRANT ALL ON TABLE "public"."hospital" TO "authenticated";
GRANT ALL ON TABLE "public"."hospital" TO "service_role";



GRANT ALL ON TABLE "public"."interview" TO "anon";
GRANT ALL ON TABLE "public"."interview" TO "authenticated";
GRANT ALL ON TABLE "public"."interview" TO "service_role";



GRANT ALL ON TABLE "public"."interview_analysis" TO "anon";
GRANT ALL ON TABLE "public"."interview_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."interview_analysis" TO "service_role";



GRANT ALL ON TABLE "public"."interview_template" TO "anon";
GRANT ALL ON TABLE "public"."interview_template" TO "authenticated";
GRANT ALL ON TABLE "public"."interview_template" TO "service_role";



GRANT ALL ON TABLE "public"."resume" TO "anon";
GRANT ALL ON TABLE "public"."resume" TO "authenticated";
GRANT ALL ON TABLE "public"."resume" TO "service_role";



GRANT ALL ON TABLE "public"."role" TO "service_role";
GRANT ALL ON TABLE "public"."role" TO "supabase_auth_admin";



GRANT ALL ON TABLE "public"."user" TO "anon";
GRANT ALL ON TABLE "public"."user" TO "authenticated";
GRANT ALL ON TABLE "public"."user" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






























RESET ALL;
