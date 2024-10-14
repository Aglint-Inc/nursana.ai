
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

CREATE EXTENSION IF NOT EXISTS "pgsodium" WITH SCHEMA "pgsodium";

COMMENT ON SCHEMA "public" IS 'standard public schema';

CREATE EXTENSION IF NOT EXISTS "pg_graphql" WITH SCHEMA "graphql";

CREATE EXTENSION IF NOT EXISTS "pg_stat_statements" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgcrypto" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "pgjwt" WITH SCHEMA "extensions";

CREATE EXTENSION IF NOT EXISTS "supabase_vault" WITH SCHEMA "vault";

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA "extensions";

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

CREATE TABLE IF NOT EXISTS "public"."campaigns" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "campaign_code" "text" NOT NULL,
    "template_id" "uuid",
    "template_version" integer NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."campaigns" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."event_logs" (
    "event_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "entity_type" "text",
    "entity_id" "uuid",
    "action" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."event_logs" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."hospitals" (
    "hospital_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_id" "uuid",
    "hospital_name" "text" NOT NULL,
    "address" "text",
    "contact_person" "text",
    "contact_email" "text",
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."hospitals" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."interview_analysis" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "nurse_id" "uuid" NOT NULL,
    "audio_url" "text",
    "video_url" "text",
    "transcript_url" "text",
    "structured_analysis" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "call_id" "text",
    "duration" smallint,
    "hospital_id" "uuid",
    "interview_id" "uuid" NOT NULL
);

ALTER TABLE "public"."interview_analysis" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."interview_templates" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "name" "text" NOT NULL,
    "status" "text" NOT NULL,
    "version" integer NOT NULL,
    "published_version" integer,
    "ai_ending_message" "text",
    "ai_instructions" "text"[],
    "ai_interview_duration" integer,
    "ai_questions" "text",
    "ai_welcome_message" "text",
    "candidate_estimated_time" "text",
    "candidate_form" "jsonb",
    "candidate_instructions" "text"[],
    "candidate_intro_video_cover_image_url" "text",
    "candidate_intro_video_url" "text",
    "candidate_overview" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."interview_templates" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."interviews" (
    "id" "uuid" DEFAULT "extensions"."uuid_generate_v4"() NOT NULL,
    "campaign_id" "uuid",
    "nurse_id" "uuid" NOT NULL,
    "template_id" "uuid",
    "template_version" integer NOT NULL,
    "campaign_code" "text" NOT NULL,
    "name" "text" NOT NULL,
    "ai_ending_message" "text",
    "ai_instructions" "text"[],
    "ai_interview_duration" integer,
    "ai_questions" "text",
    "ai_welcome_message" "text",
    "candidate_estimated_time" "text",
    "candidate_form" "jsonb",
    "candidate_instructions" "text"[],
    "candidate_intro_video_cover_image_url" "text",
    "candidate_intro_video_url" "text",
    "candidate_overview" "text"[],
    "created_at" timestamp with time zone DEFAULT "now"(),
    "updated_at" timestamp with time zone DEFAULT "now"(),
    "interview_stage" "public"."interview_stage" DEFAULT 'not_started'::"public"."interview_stage" NOT NULL,
    CONSTRAINT "check_valid_stages" CHECK (("interview_stage" = ANY (ARRAY['not_started'::"public"."interview_stage", 'resume_submitted'::"public"."interview_stage", 'interview_inprogress'::"public"."interview_stage", 'interview_completed'::"public"."interview_stage"])))
);

ALTER TABLE "public"."interviews" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."nurses" (
    "nurse_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "email" "text",
    "first_name" "text",
    "last_name" "text",
    "job_title" "text",
    "phone_number" "text",
    "profile_status" "text",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "terms_accepted" boolean DEFAULT false
);

ALTER TABLE "public"."nurses" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."resumes" (
    "id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "hospital_id" "uuid",
    "nurse_id" "uuid",
    "file_url" "text",
    "structured_resume" "jsonb",
    "created_at" timestamp with time zone DEFAULT "now"(),
    "file_name" "text",
    "file_size" "text",
    "updated_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."resumes" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tenant_hospital_access" (
    "tenant_id" "uuid" NOT NULL,
    "hospital_id" "uuid" NOT NULL
);

ALTER TABLE "public"."tenant_hospital_access" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."tenants" (
    "tenant_id" "uuid" DEFAULT "gen_random_uuid"() NOT NULL,
    "tenant_name" "text" NOT NULL,
    "contact_email" "text" NOT NULL,
    "created_at" timestamp with time zone DEFAULT "now"()
);

ALTER TABLE "public"."tenants" OWNER TO "postgres";

CREATE TABLE IF NOT EXISTS "public"."user_tenant_access" (
    "user_id" "uuid" NOT NULL,
    "tenant_id" "uuid" NOT NULL
);

ALTER TABLE "public"."user_tenant_access" OWNER TO "postgres";

ALTER TABLE ONLY "public"."campaigns"
    ADD CONSTRAINT "campaigns_campaign_code_key" UNIQUE ("campaign_code");

ALTER TABLE ONLY "public"."campaigns"
    ADD CONSTRAINT "campaigns_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."event_logs"
    ADD CONSTRAINT "event_logs_pkey" PRIMARY KEY ("event_id");

ALTER TABLE ONLY "public"."hospitals"
    ADD CONSTRAINT "hospitals_pkey" PRIMARY KEY ("hospital_id");

ALTER TABLE ONLY "public"."interview_templates"
    ADD CONSTRAINT "interview_templates_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "interviews_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."resumes"
    ADD CONSTRAINT "nurse_resumes_nurse_id_key" UNIQUE ("nurse_id");

ALTER TABLE ONLY "public"."resumes"
    ADD CONSTRAINT "nurse_resumes_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "nurse_video_interview_analysis_pkey" PRIMARY KEY ("id");

ALTER TABLE ONLY "public"."nurses"
    ADD CONSTRAINT "nurses_pkey" PRIMARY KEY ("nurse_id");

ALTER TABLE ONLY "public"."tenant_hospital_access"
    ADD CONSTRAINT "tenant_hospital_access_pkey" PRIMARY KEY ("tenant_id", "hospital_id");

ALTER TABLE ONLY "public"."tenants"
    ADD CONSTRAINT "tenants_pkey" PRIMARY KEY ("tenant_id");

ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "unique_interview_analysis" UNIQUE ("interview_id");

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "unique_nurse_campaign" UNIQUE ("nurse_id", "campaign_id");

ALTER TABLE ONLY "public"."user_tenant_access"
    ADD CONSTRAINT "user_tenant_access_pkey" PRIMARY KEY ("user_id", "tenant_id");

CREATE OR REPLACE TRIGGER "update_interview_analysis_modtime" BEFORE UPDATE ON "public"."interview_analysis" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();

CREATE OR REPLACE TRIGGER "update_resumes_modtime" BEFORE UPDATE ON "public"."resumes" FOR EACH ROW EXECUTE FUNCTION "public"."update_modified_column"();

ALTER TABLE ONLY "public"."campaigns"
    ADD CONSTRAINT "campaigns_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."interview_templates"("id");

ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "fk_hospital" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("hospital_id");

ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "fk_interview" FOREIGN KEY ("interview_id") REFERENCES "public"."interviews"("id");

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "fk_nurse" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("nurse_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."hospitals"
    ADD CONSTRAINT "hospitals_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("tenant_id");

ALTER TABLE ONLY "public"."interview_analysis"
    ADD CONSTRAINT "interview_analysis_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("nurse_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "interviews_campaign_id_fkey" FOREIGN KEY ("campaign_id") REFERENCES "public"."campaigns"("id");

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "interviews_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("nurse_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."interviews"
    ADD CONSTRAINT "interviews_template_id_fkey" FOREIGN KEY ("template_id") REFERENCES "public"."interview_templates"("id");

ALTER TABLE ONLY "public"."resumes"
    ADD CONSTRAINT "nurse_resumes_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("hospital_id");

ALTER TABLE ONLY "public"."nurses"
    ADD CONSTRAINT "nurses_user_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "auth"."users"("id");

ALTER TABLE ONLY "public"."resumes"
    ADD CONSTRAINT "resumes_nurse_id_fkey" FOREIGN KEY ("nurse_id") REFERENCES "public"."nurses"("nurse_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."tenant_hospital_access"
    ADD CONSTRAINT "tenant_hospital_access_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "public"."hospitals"("hospital_id");

ALTER TABLE ONLY "public"."tenant_hospital_access"
    ADD CONSTRAINT "tenant_hospital_access_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("tenant_id");

ALTER TABLE ONLY "public"."user_tenant_access"
    ADD CONSTRAINT "user_tenant_access_tenant_id_fkey" FOREIGN KEY ("tenant_id") REFERENCES "public"."tenants"("tenant_id") ON DELETE CASCADE;

ALTER TABLE ONLY "public"."user_tenant_access"
    ADD CONSTRAINT "user_tenant_access_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;

ALTER PUBLICATION "supabase_realtime" OWNER TO "postgres";

GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";

GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "anon";
GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "authenticated";
GRANT ALL ON FUNCTION "public"."create_interview_v2"("p_campaign_code" "text", "p_nurse_id" "text", "p_interview_stage" "text") TO "service_role";

GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "anon";
GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."increment_template_version"() TO "service_role";

GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "anon";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."update_modified_column"() TO "service_role";

GRANT ALL ON TABLE "public"."campaigns" TO "anon";
GRANT ALL ON TABLE "public"."campaigns" TO "authenticated";
GRANT ALL ON TABLE "public"."campaigns" TO "service_role";

GRANT ALL ON TABLE "public"."event_logs" TO "anon";
GRANT ALL ON TABLE "public"."event_logs" TO "authenticated";
GRANT ALL ON TABLE "public"."event_logs" TO "service_role";

GRANT ALL ON TABLE "public"."hospitals" TO "anon";
GRANT ALL ON TABLE "public"."hospitals" TO "authenticated";
GRANT ALL ON TABLE "public"."hospitals" TO "service_role";

GRANT ALL ON TABLE "public"."interview_analysis" TO "anon";
GRANT ALL ON TABLE "public"."interview_analysis" TO "authenticated";
GRANT ALL ON TABLE "public"."interview_analysis" TO "service_role";

GRANT ALL ON TABLE "public"."interview_templates" TO "anon";
GRANT ALL ON TABLE "public"."interview_templates" TO "authenticated";
GRANT ALL ON TABLE "public"."interview_templates" TO "service_role";

GRANT ALL ON TABLE "public"."interviews" TO "anon";
GRANT ALL ON TABLE "public"."interviews" TO "authenticated";
GRANT ALL ON TABLE "public"."interviews" TO "service_role";

GRANT ALL ON TABLE "public"."nurses" TO "anon";
GRANT ALL ON TABLE "public"."nurses" TO "authenticated";
GRANT ALL ON TABLE "public"."nurses" TO "service_role";

GRANT ALL ON TABLE "public"."resumes" TO "anon";
GRANT ALL ON TABLE "public"."resumes" TO "authenticated";
GRANT ALL ON TABLE "public"."resumes" TO "service_role";

GRANT ALL ON TABLE "public"."tenant_hospital_access" TO "anon";
GRANT ALL ON TABLE "public"."tenant_hospital_access" TO "authenticated";
GRANT ALL ON TABLE "public"."tenant_hospital_access" TO "service_role";

GRANT ALL ON TABLE "public"."tenants" TO "anon";
GRANT ALL ON TABLE "public"."tenants" TO "authenticated";
GRANT ALL ON TABLE "public"."tenants" TO "service_role";

GRANT ALL ON TABLE "public"."user_tenant_access" TO "anon";
GRANT ALL ON TABLE "public"."user_tenant_access" TO "authenticated";
GRANT ALL ON TABLE "public"."user_tenant_access" TO "service_role";

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
