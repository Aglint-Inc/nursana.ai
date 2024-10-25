set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_interview_v2(p_campaign_code text, p_nurse_id text, p_interview_stage text)
 RETURNS uuid
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.custom_access_token_hook(event jsonb)
 RETURNS jsonb
 LANGUAGE plpgsql
 STABLE
AS $function$
  declare
    claims jsonb;
    user_role public.user_role;
  begin

    select public.user.user_role into user_role from public.user where id = (event->>'user_id')::uuid;

    claims := event->'claims';

    if user_role is not null then
      claims := jsonb_set(claims, '{user_role}', to_jsonb(user_role));
    else
      claims := jsonb_set(claims, '{user_role}', 'null');
    end if;

    event := jsonb_set(event, '{claims}', claims);

    return event;

  end;
$function$
;

CREATE OR REPLACE FUNCTION public.increment_template_version()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
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
$function$
;

CREATE OR REPLACE FUNCTION public.post_process_interview()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
    PERFORM net.http_post(
        url := 'https://nursana.ai/api/backup-interview-data',
        headers := '{"Content-Type": "application/json"}'::jsonb,
        body := json_build_object('interview_analysis_id', NEW.id)::jsonb
    );
    RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.update_modified_column()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$function$
;


