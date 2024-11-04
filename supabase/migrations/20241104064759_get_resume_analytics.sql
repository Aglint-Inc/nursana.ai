CREATE OR REPLACE FUNCTION public.get_resume_analytics(version_uuid uuid, start_date timestamp with time zone DEFAULT NULL::timestamp with time zone, end_date timestamp with time zone DEFAULT now())
 RETURNS TABLE(total_experience text, schools jsonb, x_job_title text, skills jsonb, licenses jsonb, location jsonb, call_analysis jsonb, resume_analysis jsonb)
 LANGUAGE plpgsql
AS $function$
DECLARE
    start_date_parsed DATE;
    end_date_parsed DATE;
BEGIN
    start_date_parsed := start_date::DATE;
    end_date_parsed := end_date::DATE;

    RETURN QUERY
    SELECT 
        resume.structured_resume->'basics'->>'totalExperienceInMonths' AS total_experience,
        resume.structured_resume->'schools' AS schools,
        resume.structured_resume->'basics'->>'currentJobTitle' AS x_job_title,
        resume.structured_resume->'skills' AS skills,
        resume.structured_resume->'licenses' AS licenses,
        resume.structured_resume->'basics'->'location' AS location,
        jsonb_build_object(
            'summary', interview_analysis.structured_analysis->>'overall_summary',
            'overallScore', interview_analysis.structured_analysis->>'overall_score'
        ) AS call_analysis,
        jsonb_build_object(
            'summary', resume.resume_feedback ->> 'summary',
            'overallScore', resume.resume_feedback ->> 'overallScore'
        ) AS resume_analysis
    FROM 
        resume 
    JOIN 
        applicant_user ON resume.applicant_id = applicant_user.id 
    JOIN 
        interview ON interview.applicant_id = resume.applicant_id 
    JOIN
        interview_analysis ON interview_analysis.interview_id = interview.id
    JOIN 
        campaign ON interview.campaign_id = campaign.id 
    JOIN 
        version ON version.id = campaign.version_id 
    WHERE 
        version.id = version_uuid
        AND resume.structured_resume IS NOT NULL
        AND (start_date IS NULL OR interview.created_at >= start_date)
        AND interview.created_at <= end_date;
END; $function$
;

