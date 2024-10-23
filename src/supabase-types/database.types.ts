export type Json = any;

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          operationName?: string
          query?: string
          variables?: Json
          extensions?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      applicant: {
        Row: {
          created_at: string | null
          current_job_title: Database["public"]["Enums"]["job_titles"]
          email: string
          first_name: string
          id: string
          last_name: string | null
          open_to_work: boolean
          phone_number: string | null
          preferred_travel_preference:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          salary_range: unknown | null
          terms_accepted: boolean
        }
        Insert: {
          created_at?: string | null
          current_job_title?: Database["public"]["Enums"]["job_titles"]
          email: string
          first_name: string
          id: string
          last_name?: string | null
          open_to_work?: boolean
          phone_number?: string | null
          preferred_travel_preference?:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          salary_range?: unknown | null
          terms_accepted?: boolean
        }
        Update: {
          created_at?: string | null
          current_job_title?: Database["public"]["Enums"]["job_titles"]
          email?: string
          first_name?: string
          id?: string
          last_name?: string | null
          open_to_work?: boolean
          phone_number?: string | null
          preferred_travel_preference?:
            | Database["public"]["Enums"]["travel_preferrence"]
            | null
          salary_range?: unknown | null
          terms_accepted?: boolean
        }
        Relationships: []
      }
      campaign: {
        Row: {
          campaign_code: string
          created_at: string | null
          description: string | null
          hospital_id: string
          id: string
          name: string
          status: Database["public"]["Enums"]["campaign_status"]
          updated_at: string | null
          version_id: string
        }
        Insert: {
          campaign_code: string
          created_at?: string | null
          description?: string | null
          hospital_id: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string | null
          version_id: string
        }
        Update: {
          campaign_code?: string
          created_at?: string | null
          description?: string | null
          hospital_id?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["campaign_status"]
          updated_at?: string | null
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "campaign_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "campaigns_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospital"
            referencedColumns: ["id"]
          },
        ]
      }
      hospital: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_number: string | null
          contact_person: string | null
          created_at: string | null
          created_by: string | null
          hospital_name: string
          id: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string | null
          created_by?: string | null
          hospital_name: string
          id?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_number?: string | null
          contact_person?: string | null
          created_at?: string | null
          created_by?: string | null
          hospital_name?: string
          id?: string
        }
        Relationships: [
          {
            foreignKeyName: "hospitals_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "user"
            referencedColumns: ["user_id"]
          },
        ]
      }
      interview: {
        Row: {
          ai_ending_message: string | null
          ai_instructions: string[] | null
          ai_interview_duration: number
          ai_questions: string | null
          ai_welcome_message: string | null
          campaign_id: string
          candidate_estimated_time: string | null
          candidate_instructions: string[] | null
          candidate_intro_video_cover_image_url: string | null
          candidate_intro_video_url: string | null
          candidate_overview: string[] | null
          created_at: string | null
          hospital_id: string
          id: string
          interview_stage: Database["public"]["Enums"]["interview_stage"]
          name: string
          updated_at: string | null
          user_id: string
          version_id: string
        }
        Insert: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          campaign_id: string
          candidate_estimated_time?: string | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          hospital_id: string
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name: string
          updated_at?: string | null
          user_id: string
          version_id: string
        }
        Update: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number
          ai_questions?: string | null
          ai_welcome_message?: string | null
          campaign_id?: string
          candidate_estimated_time?: string | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          hospital_id?: string
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name?: string
          updated_at?: string | null
          user_id?: string
          version_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "interview_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospital"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_version_id_fkey"
            columns: ["version_id"]
            isOneToOne: false
            referencedRelation: "version"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "applicant"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_analysis: {
        Row: {
          analysis_status: Json | null
          audio_url: string | null
          call_analysis: Json | null
          call_id: string | null
          created_at: string | null
          id: string
          interview_id: string
          structured_analysis: Json | null
          transcript: string | null
          transcript_json: Json[] | null
          transcript_url: string | null
          updated_at: string | null
          user_id: string
          video_url: string | null
        }
        Insert: {
          analysis_status?: Json | null
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          id?: string
          interview_id: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          user_id: string
          video_url?: string | null
        }
        Update: {
          analysis_status?: Json | null
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          id?: string
          interview_id?: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          user_id?: string
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_interview"
            columns: ["interview_id"]
            isOneToOne: true
            referencedRelation: "interview"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_analysis_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "applicant"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_analysis_id: {
        Row: {
          id: string | null
        }
        Insert: {
          id?: string | null
        }
        Update: {
          id?: string | null
        }
        Relationships: []
      }
      preferred_job_titles: {
        Row: {
          applicant_id: string
          id: string
          job_title: Database["public"]["Enums"]["job_titles"]
        }
        Insert: {
          applicant_id?: string
          id?: string
          job_title: Database["public"]["Enums"]["job_titles"]
        }
        Update: {
          applicant_id?: string
          id?: string
          job_title?: Database["public"]["Enums"]["job_titles"]
        }
        Relationships: [
          {
            foreignKeyName: "preferred_job_titles_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant"
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
            foreignKeyName: "preferred_job_types_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant"
            referencedColumns: ["id"]
          },
        ]
      }
      preferred_locations: {
        Row: {
          applicant_id: string
          city: string | null
          country: string | null
          id: string
          state: string | null
        }
        Insert: {
          applicant_id: string
          city?: string | null
          country?: string | null
          id?: string
          state?: string | null
        }
        Update: {
          applicant_id?: string
          city?: string | null
          country?: string | null
          id?: string
          state?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "preferred_locations_applicant_id_fkey"
            columns: ["applicant_id"]
            isOneToOne: false
            referencedRelation: "applicant"
            referencedColumns: ["id"]
          },
        ]
      }
      resume: {
        Row: {
          campaign_id: string
          created_at: string | null
          error_status: Json | null
          file_url: string
          id: string
          processing_status: Json | null
          resume_feedback: Json | null
          structured_resume: Json | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          campaign_id: string
          created_at?: string | null
          error_status?: Json | null
          file_url: string
          id?: string
          processing_status?: Json | null
          resume_feedback?: Json | null
          structured_resume?: Json | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          campaign_id?: string
          created_at?: string | null
          error_status?: Json | null
          file_url?: string
          id?: string
          processing_status?: Json | null
          resume_feedback?: Json | null
          structured_resume?: Json | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "resumes_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaign"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resumes_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "applicant"
            referencedColumns: ["id"]
          },
        ]
      }
      role: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      template: {
        Row: {
          created_at: string
          hospital_id: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          hospital_id: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          hospital_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "template_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospital"
            referencedColumns: ["id"]
          },
        ]
      }
      user: {
        Row: {
          created_at: string
          email: string
          first_name: string
          hospital_id: string
          last_name: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          email: string
          first_name: string
          hospital_id: string
          last_name?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          email?: string
          first_name?: string
          hospital_id?: string
          last_name?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "tenant_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospital"
            referencedColumns: ["id"]
          },
        ]
      }
      version: {
        Row: {
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
          hospital_id: string
          id: string
          name: string
          status: Database["public"]["Enums"]["version_status"]
          template_id: string
          updated_at: string
        }
        Insert: {
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
          hospital_id: string
          id?: string
          name: string
          status?: Database["public"]["Enums"]["version_status"]
          template_id: string
          updated_at?: string
        }
        Update: {
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
          hospital_id?: string
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["version_status"]
          template_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "version_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospital"
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
    }
    Enums: {
      app_role: "applicant" | "user"
      campaign_status: "archived" | "active"
      interview_stage:
        | "not_started"
        | "resume_submitted"
        | "interview_inprogress"
        | "interview_completed"
      job_titles:
        | "registered-nurse"
        | "nurse-practitioner"
        | "licensed-practical-nurse"
        | "clinical-nurse-specialist"
        | "certified-nurse-midwife"
      job_types: "full-time" | "part-time" | "contract" | "internship"
      travel_preferrence:
        | "no-travel"
        | "occasional-travel"
        | "frequent-travel"
        | "up-to-50-travel"
        | "up-to-75-travel"
        | "100-travel"
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
