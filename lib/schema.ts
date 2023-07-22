export type Json =
  | string
  | number
  | number
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      questions: {
        Row: {
          id: number
          inserted_at: string
          updated_at: string
          likes: number | null
          views: number | null
          content: string | null
          answer: string | null
          user_id: string
        }
        Insert: {
          id?: number
          inserted_at?: string
          updated_at?: string
          likes?: number | null
          views?: number | null
          content?: string | null
          user_id: string
        }
        Update: {
          id?: number
          inserted_at?: string
          updated_at?: string
          likes?: number | null
          views?: number | null
          content?: string | null
          answer?: string | null
          user_id?: string
        }
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
