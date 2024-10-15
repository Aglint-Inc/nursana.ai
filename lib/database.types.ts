export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

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
      campaigns: {
        Row: {
          campaign_code: string
          created_at: string | null
          description: string | null
          id: string
          name: string
          template_id: string | null
          template_version: number
          updated_at: string | null
        }
        Insert: {
          campaign_code: string
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          template_id?: string | null
          template_version: number
          updated_at?: string | null
        }
        Update: {
          campaign_code?: string
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          template_id?: string | null
          template_version?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "campaigns_template_id_fkey"
            columns: ["template_id"]
            isOneToOne: false
            referencedRelation: "interview_templates"
            referencedColumns: ["id"]
          },
        ]
      }
      event_logs: {
        Row: {
          action: string | null
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          event_id: string
        }
        Insert: {
          action?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          event_id?: string
        }
        Update: {
          action?: string | null
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          event_id?: string
        }
        Relationships: []
      }
      hospitals: {
        Row: {
          address: string | null
          contact_email: string | null
          contact_person: string | null
          created_at: string | null
          hospital_name: string
          id: string
        }
        Insert: {
          address?: string | null
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string | null
          hospital_name: string
          id?: string
        }
        Update: {
          address?: string | null
          contact_email?: string | null
          contact_person?: string | null
          created_at?: string | null
          hospital_name?: string
          id?: string
        }
        Relationships: []
      }
      interview_analysis: {
        Row: {
          audio_url: string | null
          call_analysis: Json | null
          call_id: string | null
          created_at: string | null
          duration: number | null
          hospital_id: string | null
          id: string
          interview_id: string
          nurse_id: string
          structured_analysis: Json | null
          transcript: string | null
          transcript_json: Json[] | null
          transcript_url: string | null
          updated_at: string | null
          video_url: string | null
        }
        Insert: {
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          duration?: number | null
          hospital_id?: string | null
          id?: string
          interview_id: string
          nurse_id: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Update: {
          audio_url?: string | null
          call_analysis?: Json | null
          call_id?: string | null
          created_at?: string | null
          duration?: number | null
          hospital_id?: string | null
          id?: string
          interview_id?: string
          nurse_id?: string
          structured_analysis?: Json | null
          transcript?: string | null
          transcript_json?: Json[] | null
          transcript_url?: string | null
          updated_at?: string | null
          video_url?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_hospital"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "fk_interview"
            columns: ["interview_id"]
            isOneToOne: true
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_analysis_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_templates: {
        Row: {
          ai_ending_message: string | null
          ai_instructions: string[] | null
          ai_interview_duration: number | null
          ai_questions: string | null
          ai_welcome_message: string | null
          candidate_estimated_time: string | null
          candidate_form: Json | null
          candidate_instructions: string[] | null
          candidate_intro_video_cover_image_url: string | null
          candidate_intro_video_url: string | null
          candidate_overview: string[] | null
          created_at: string | null
          id: string
          name: string
          published_version: number | null
          status: string
          updated_at: string | null
          version: number
        }
        Insert: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number | null
          ai_questions?: string | null
          ai_welcome_message?: string | null
          candidate_estimated_time?: string | null
          candidate_form?: Json | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          name: string
          published_version?: number | null
          status: string
          updated_at?: string | null
          version: number
        }
        Update: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number | null
          ai_questions?: string | null
          ai_welcome_message?: string | null
          candidate_estimated_time?: string | null
          candidate_form?: Json | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          name?: string
          published_version?: number | null
          status?: string
          updated_at?: string | null
          version?: number
        }
        Relationships: []
      }
      interviews: {
        Row: {
          ai_ending_message: string | null
          ai_instructions: string[] | null
          ai_interview_duration: number | null
          ai_questions: string | null
          ai_welcome_message: string | null
          campaign_code: string
          campaign_id: string | null
          candidate_estimated_time: string | null
          candidate_form: Json | null
          candidate_instructions: string[] | null
          candidate_intro_video_cover_image_url: string | null
          candidate_intro_video_url: string | null
          candidate_overview: string[] | null
          created_at: string | null
          id: string
          interview_stage: Database["public"]["Enums"]["interview_stage"]
          name: string
          nurse_id: string
          updated_at: string | null
        }
        Insert: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number | null
          ai_questions?: string | null
          ai_welcome_message?: string | null
          campaign_code: string
          campaign_id?: string | null
          candidate_estimated_time?: string | null
          candidate_form?: Json | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name: string
          nurse_id: string
          updated_at?: string | null
        }
        Update: {
          ai_ending_message?: string | null
          ai_instructions?: string[] | null
          ai_interview_duration?: number | null
          ai_questions?: string | null
          ai_welcome_message?: string | null
          campaign_code?: string
          campaign_id?: string | null
          candidate_estimated_time?: string | null
          candidate_form?: Json | null
          candidate_instructions?: string[] | null
          candidate_intro_video_cover_image_url?: string | null
          candidate_intro_video_url?: string | null
          candidate_overview?: string[] | null
          created_at?: string | null
          id?: string
          interview_stage?: Database["public"]["Enums"]["interview_stage"]
          name?: string
          nurse_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "fk_nurse"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_campaign_id_fkey"
            columns: ["campaign_id"]
            isOneToOne: false
            referencedRelation: "campaigns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interviews_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      resumes: {
        Row: {
          created_at: string | null
          error_status: Json | null
          file_name: string | null
          file_size: string | null
          file_url: string | null
          hospital_id: string | null
          id: string
          nurse_id: string | null
          structured_resume: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          error_status?: Json | null
          file_name?: string | null
          file_size?: string | null
          file_url?: string | null
          hospital_id?: string | null
          id?: string
          nurse_id?: string | null
          structured_resume?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          error_status?: Json | null
          file_name?: string | null
          file_size?: string | null
          file_url?: string | null
          hospital_id?: string | null
          id?: string
          nurse_id?: string | null
          structured_resume?: Json | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "nurse_resumes_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resumes_nurse_id_fkey"
            columns: ["nurse_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_hospital_access: {
        Row: {
          hospital_id: string
          id: string
          user_id: string
        }
        Insert: {
          hospital_id: string
          id?: string
          user_id: string
        }
        Update: {
          hospital_id?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_tenant_access_hospital_id_fkey"
            columns: ["hospital_id"]
            isOneToOne: false
            referencedRelation: "hospitals"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: number
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: number
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          created_at: string | null
          email: string | null
          expected_salary: number | null
          first_name: string | null
          id: string
          job_title: string | null
          job_type: string | null
          last_name: string | null
          phone_number: string | null
          preferred_job_titles: string[] | null
          preferred_locations: string[] | null
          profile_status: string | null
          terms_accepted: boolean | null
          travel_preference: string | null
        }
        Insert: {
          created_at?: string | null
          email?: string | null
          expected_salary?: number | null
          first_name?: string | null
          id: string
          job_title?: string | null
          job_type?: string | null
          last_name?: string | null
          phone_number?: string | null
          preferred_job_titles?: string[] | null
          preferred_locations?: string[] | null
          profile_status?: string | null
          terms_accepted?: boolean | null
          travel_preference?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string | null
          expected_salary?: number | null
          first_name?: string | null
          id?: string
          job_title?: string | null
          job_type?: string | null
          last_name?: string | null
          phone_number?: string | null
          preferred_job_titles?: string[] | null
          preferred_locations?: string[] | null
          profile_status?: string | null
          terms_accepted?: boolean | null
          travel_preference?: string | null
        }
        Relationships: []
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
      app_role: "nurse" | "hospital" | "doctor" | "therapist"
      interview_stage:
        | "not_started"
        | "resume_submitted"
        | "interview_inprogress"
        | "interview_completed"
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
