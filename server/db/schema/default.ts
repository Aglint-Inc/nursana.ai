export type Json = Record<string | number , unknown>;

export type Database = {
  public: {
    Tables: {
      agency: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_number: string | null
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      agency_user: {
        Row: {
          agency_id: string
          id: string
        }
        Insert: {
          agency_id: string
          id: string
        }
        Update: {
          agency_id?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "agency_user_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "agency_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      applicant_user: {
        Row: {
          certification_agency: string[] | null
          created_at: string | null
          current_company: string | null
          current_job_title: string | null
          education_level: string | null
          employment_interest: string | null
          id: string
          income_level: string | null
          job_title: Database["public"]["Enums"]["nerse_titles"]
          licence_number: string | null
          licenced_year: string | null
          licensed_state: string | null
          licenses: Database["public"]["Enums"]["nurse_license"][] | null
          malpractice_insurance: boolean | null
          memberships: string[]
          npi_number: string | null
          open_to_work: boolean
          patients_attend_per_week: number | null
          phone_number: string | null
          preceptorship_interest: boolean | null
          preferred_travel_preference:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          professional_highlight: string | null
          proffessional_titles: string | null
          salary_range: unknown | null
          specialties: string[]
          terms_accepted: boolean
          virtues: string | null
        }
        Insert: {
          certification_agency?: string[] | null
          created_at?: string | null
          current_company?: string | null
          current_job_title?: string | null
          education_level?: string | null
          employment_interest?: string | null
          id: string
          income_level?: string | null
          job_title?: Database["public"]["Enums"]["nerse_titles"]
          licence_number?: string | null
          licenced_year?: string | null
          licensed_state?: string | null
          licenses?: Database["public"]["Enums"]["nurse_license"][] | null
          malpractice_insurance?: boolean | null
          memberships?: string[]
          npi_number?: string | null
          open_to_work?: boolean
          patients_attend_per_week?: number | null
          phone_number?: string | null
          preceptorship_interest?: boolean | null
          preferred_travel_preference?:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          professional_highlight?: string | null
          proffessional_titles?: string | null
          salary_range?: unknown | null
          specialties?: string[]
          terms_accepted?: boolean
          virtues?: string | null
        }
        Update: {
          certification_agency?: string[] | null
          created_at?: string | null
          current_company?: string | null
          current_job_title?: string | null
          education_level?: string | null
          employment_interest?: string | null
          id?: string
          income_level?: string | null
          job_title?: Database["public"]["Enums"]["nerse_titles"]
          licence_number?: string | null
          licenced_year?: string | null
          licensed_state?: string | null
          licenses?: Database["public"]["Enums"]["nurse_license"][] | null
          malpractice_insurance?: boolean | null
          memberships?: string[]
          npi_number?: string | null
          open_to_work?: boolean
          patients_attend_per_week?: number | null
          phone_number?: string | null
          preceptorship_interest?: boolean | null
          preferred_travel_preference?:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          professional_highlight?: string | null
          proffessional_titles?: string | null
          salary_range?: unknown | null
          specialties?: string[]
          terms_accepted?: boolean
          virtues?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "applicant_user_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["id"]
          },
        ]
      }
      campaign: {
        Row: {
          agency_id: string
          campaign_code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["campaign_status"]
          updated_at: string | null
          version_id: string
        }
        Insert: {
          agency_id: string
          campaign_code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string | null
          version_id: string
        }
        Update: {
          agency_id?: string
          campaign_code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaign_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "version"
            referencedColumns: ["id"]
          },
        ]
      }
      env: {
        Row: {
          created_at: string
          key: string
          value: string
        }
        Insert: {
          created_at?: string
          key: string
          value: string
        }
        Update: {
          created_at?: string
          key?: string
          value?: string
        }
        Relationships: []
      }
      interview: {
        Row: {
          agency_id: string
          ai_ending_message: string | null
          ai_instructions: string[] | null
          ai_interview_duration: number
          ai_questions: string | null
          ai_welcome_message: string | null
          applicant_id: string
          campaign_id: string
          candidate_estimated_time: string | null
          candidate_instructions: string[] | null
          candidate_intro_video_cover_image_url: string | null
          candidate_intro_video_url: string | null
          candidate_overview: string[] | null
          created_at: string | null
          id: string
          interview_stage: Database["public"]["Enums"]["interview_stage"]
          name: string
          updated_at: string | null
          version_id: string
        }
        Insert: {
          agency_id: string
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          applicant_id: string
          campaign_id: string
          candidate_estimated_time?: string | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name: string
          updated_at?: string | null
          version_id: string
        }
        Update: {
          agency_id?: string
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          applicant_id?: string
          campaign_id?: string
          candidate_estimated_time?: string | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name?: string
          updated_at?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "version"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_analysis: {
        Row: {
          analysis_status: Json | null
          applicant_id: string
          audio_url: string | null
          call_analysis: Json | null
          call_id: string | null
          created_at: string | null
          google_storage_uri: string | null
          id: string
          interview_id: string
          structured_analysis: Json | null
          transcript: string | null
          transcript_json: Json[] | null
          transcript_url: string | null
          updated_at: string | null
          video_analysis: Json | null
          video_url: string | null
        }
        Insert: {
          analysis_status?: Json | null
          applicant_id: string
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          google_storage_uri?: string | null
          id?: string
          interview_id: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          video_analysis?: Json | null
          video_url?: string | null
        }
        Update: {
          analysis_status?: Json | null
          applicant_id?: string
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          google_storage_uri?: string | null
          id?: string
          interview_id?: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          video_analysis?: Json | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_analysis_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_analysis_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: true
            referencedRelation: "interview"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_scheduled: {
        Row: {
          created_at: string
          interview_id: string
          scheduled_at: string | null
        }
        Insert: {
          created_at?: string
          interview_id: string
          scheduled_at?: string | null
        }
        Update: {
          created_at?: string
          interview_id?: string
          scheduled_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_scheduled_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: true
            referencedRelation: "interview"
            referencedColumns: ["id"]
          },
        ]
      }
      locations_list: {
        Row: {
          city: string
          country: string
          level: string
          place_id: string
          state: string
        }
        Insert: {
          city: string
          country: string
          level: string
          place_id: string
          state: string
        }
        Update: {
          city?: string
          country?: string
          level?: string
          place_id?: string
          state?: string
        }
        Relationships: []
      }
      preferred_job_titles: {
        Row: {
          applicant_id: string
          id: string
          job_titles: Database["public"]["Enums"]["nerse_titles"]
        }
        Insert: {
          applicant_id?: string
          id?: string
          job_titles?: Database["public"]["Enums"]["nerse_titles"]
        }
        Update: {
          applicant_id?: string
          id?: string
          job_titles?: Database["public"]["Enums"]["nerse_titles"]
        }
        Relationships: [
          {
            foreignKeyName: "preferred_job_title_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
        ]
      }
      preferred_job_types: {
        Row: {
          applicant_id: string
          id: string
          job_type: Database["public"]["Enums"]["job_types"] | null
        }
        Insert: {
          applicant_id: string
          id?: string
          job_type?: Database["public"]["Enums"]["job_types"] | null
        }
        Update: {
          applicant_id?: string
          id?: string
          job_type?: Database["public"]["Enums"]["job_types"] | null
        }
        Relationships: [
          {
            foreignKeyName: "preferred_job_type_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
        ]
      }
      preferred_locations: {
        Row: {
          applicant_id: string
          id: string
          place_id: string
        }
        Insert: {
          applicant_id: string
          id?: string
          place_id: string
        }
        Update: {
          applicant_id?: string
          id?: string
          place_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "preferred_location_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "preferred_locations_place_id_fkey"
            columns: ["place_id"]
            isOneToOne: false
            referencedRelation: "locations_list"
            referencedColumns: ["place_id"]
          },
        ]
      }
      resume: {
        Row: {
          applicant_id: string
          campaign_id: string
          created_at: string | null
          error_status: Json | null
          file_url: string
          id: string
          processing_status: Json | null
          resume_feedback: Json | null
          structured_resume: Json | null
          updated_at: string | null
        }
        Insert: {
          applicant_id: string
          campaign_id: string
          created_at?: string | null
          error_status?: Json | null
          file_url: string
          id?: string
          processing_status?: Json | null
          resume_feedback?: Json | null
          structured_resume?: Json | null
          updated_at?: string | null
        }
        Update: {
          applicant_id?: string
          campaign_id?: string
          created_at?: string | null
          error_status?: Json | null
          file_url?: string
          id?: string
          processing_status?: Json | null
          resume_feedback?: Json | null
          structured_resume?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "resume_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: true
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resume_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
        ]
      }
      template: {
        Row: {
          agency_id: string
          created_at: string
          id: string
          name: string
        }
        Insert: {
          agency_id: string
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          agency_id?: string
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string
          id: string
          last_name: string
          user_role: Database["public"]["Enums"]["user_role"]
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          id: string
          last_name?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          id?: string
          last_name?: string
          user_role?: Database["public"]["Enums"]["user_role"]
        }
        Relationships: []
      }
      user_interview_rating: {
        Row: {
          applicant_id: string
          created_at: string
          feedback: string
          id: string
          rating: number
        }
        Insert: {
          applicant_id?: string
          created_at?: string
          feedback?: string
          id?: string
          rating: number
        }
        Update: {
          applicant_id?: string
          created_at?: string
          feedback?: string
          id?: string
          rating?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_interview_rating_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant_user"
            referencedColumns: ["id"]
          },
        ]
      }
      version: {
        Row: {
          agency_id: string
          ai_ending_message: string | null
          ai_instructions: string
          ai_interview_duration: number
          ai_questions: string | null
          ai_welcome_message: string | null
          candidate_estimated_time: string | null
          candidate_instructions: string
          candidate_intro_video_cover_image_url: string | null
          candidate_intro_video_url: string | null
          candidate_overview: string
          created_at: string
          id: string
          name: string
          status: Database["public"]["Enums"]["version_status"]
          template_id: string
          updated_at: string
        }
        Insert: {
          agency_id: string
          ai_ending_message?: string | null
          ai_instructions?: string
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          candidate_estimated_time?: string | null
          candidate_instructions?: string
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string
          created_at?: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["version_status"]
          template_id: string
          updated_at?: string
        }
        Update: {
          agency_id?: string
          ai_ending_message?: string | null
          ai_instructions?: string
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          candidate_estimated_time?: string | null
          candidate_instructions?: string
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string
          created_at?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["version_status"]
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "version_agency_id_fkey"
            columns: ["agency_id"]
            isOneToOne: false
            referencedRelation: "agency"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "version_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "template"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_interview_v2: {
        Args: {
          p_campaign_code: string
          p_nurse_id: string
          p_interview_stage: string
        }
        Returns: string
      }
      custom_access_token_hook: {
        Args: {
          event: Json
        }
        Returns: Json
      }
      get_env_value: {
        Args: {
          p_key: string
        }
        Returns: string
      }
      get_resume_analytics: {
        Args: {
          version_uuid: string
          start_date?: string
          end_date?: string
        }
        Returns: {
          total_experience: string
          schools: Json
          x_job_title: string
          skills: Json
          licenses: Json
          location: Json
          call_analysis: Json
          resume_analysis: Json
        }[]
      }
    }
    Enums: {
      campaign_status: "archived" | "active"
      interview_stage:
        | "not_started"
        | "resume_submitted"
        | "interview_inprogress"
        | "interview_completed"
      job_types: "full-time" | "part-time" | "contract" | "internship"
      nerse_titles:
        | "registered-nurse"
        | "licensed-practical-nurse"
        | "nurse-practitioner"
        | "certified-registered-nurse-anesthetist"
        | "certified-nurse-midwife"
        | "clinical-nurse-specialist"
        | "cardiac-nurse"
        | "oncology-nurse"
        | "pediatric-nurse"
        | "geriatric-nurse"
        | "orthopedic-nurse"
        | "neonatal-nurse"
        | "perioperative-operating-room-nurse"
        | "emergency-trauma-nurse"
        | "critical-care-icu-nurse"
        | "psychiatric-mental-health-nurse"
        | "rehabilitation-nurse"
        | "infection-control-nurse"
        | "public-health-nurse"
        | "community-health-nurse"
        | "home-health-nurse"
        | "school-nurse"
        | "nurse-educator"
        | "nurse-researcher"
        | "nurse-informaticist"
        | "nurse-administrator-nurse-executive"
        | "nurse-case-manager"
        | "nurse-consultant"
        | "quality-improvement-nurse"
        | "forensic-nurse"
        | "holistic-nurse"
        | "telehealth-nurse"
        | "flight-transport-nurse"
        | "military-nurse"
        | "occupational-health-nurse"
        | "hospice-palliative-care-nurse"
      nurse_license:
        | "registered-nurse"
        | "nurse-practitioner"
        | "licensed-practical-nurse"
        | "clinical-nurse-specialist"
        | "certified-nurse-midwife"
        | "advanced-practice-registered-nurse"
        | "certified-registered-nurse-anesthetist"
        | "public-health-nurse"
        | "registered-nurse-board-certified"
        | "certified-nursing-assistant"
        | "home-health-aide"
        | "acute-care-nurse-practitioner"
        | "family-nurse-practitioner"
        | "pediatric-nurse-practitioner"
        | "adult-gerontology-nurse-practitioner"
        | "psychiatric-mental-health-nurse-practitioner"
        | "travel-nurse-license-compact-license"
      travel_preferrence:
        | "no-travel"
        | "occasional-travel"
        | "frequent-travel"
        | "up-to-50-travel"
        | "up-to-75-travel"
        | "100-travel"
      user_role: "applicant_user" | "agency_user"
      version_status: "archived" | "active"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
