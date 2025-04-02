export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      big_five_results: {
        Row: {
          agreeableness: number
          conscientiousness: number
          created_at: string
          extraversion: number
          id: string
          neuroticism: number
          openness: number
          updated_at: string
          user_id: string
        }
        Insert: {
          agreeableness: number
          conscientiousness: number
          created_at?: string
          extraversion: number
          id?: string
          neuroticism: number
          openness: number
          updated_at?: string
          user_id: string
        }
        Update: {
          agreeableness?: number
          conscientiousness?: number
          created_at?: string
          extraversion?: number
          id?: string
          neuroticism?: number
          openness?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      daily_activities: {
        Row: {
          activity_date: string
          activity_name: string
          completed: boolean | null
          created_at: string
          duration: number
          duration_unit: string
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          activity_date?: string
          activity_name: string
          completed?: boolean | null
          created_at?: string
          duration: number
          duration_unit: string
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          activity_date?: string
          activity_name?: string
          completed?: boolean | null
          created_at?: string
          duration?: number
          duration_unit?: string
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      journal_entries: {
        Row: {
          created_at: string
          feelings: string
          gratitude: string
          id: string
          thought_process: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          feelings: string
          gratitude: string
          id?: string
          thought_process: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          feelings?: string
          gratitude?: string
          id?: string
          thought_process?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      personality_results: {
        Row: {
          created_at: string
          id: string
          mbti_type: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mbti_type: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mbti_type?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          first_name: string | null
          id: string
          last_name: string | null
          password: string | null
          updated_at: string
          wellness_score: number | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id: string
          last_name?: string | null
          password?: string | null
          updated_at?: string
          wellness_score?: number | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          first_name?: string | null
          id?: string
          last_name?: string | null
          password?: string | null
          updated_at?: string
          wellness_score?: number | null
        }
        Relationships: []
      }
      wellness_insights: {
        Row: {
          analysis_period: string
          analytical_framework: string
          created_at: string
          end_date: string
          id: string
          insight_text: string
          start_date: string
          user_id: string
        }
        Insert: {
          analysis_period: string
          analytical_framework?: string
          created_at?: string
          end_date: string
          id?: string
          insight_text: string
          start_date: string
          user_id: string
        }
        Update: {
          analysis_period?: string
          analytical_framework?: string
          created_at?: string
          end_date?: string
          id?: string
          insight_text?: string
          start_date?: string
          user_id?: string
        }
        Relationships: []
      }
      wellness_scores: {
        Row: {
          created_at: string
          id: string
          mental_score: number
          nutrition_score: number | null
          physical_score: number | null
          score_date: string
          sleep_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          mental_score: number
          nutrition_score?: number | null
          physical_score?: number | null
          score_date?: string
          sleep_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          mental_score?: number
          nutrition_score?: number | null
          physical_score?: number | null
          score_date?: string
          sleep_score?: number | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
