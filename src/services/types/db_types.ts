export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Collections: {
        Row: {
          created_at: string | null
          id: string
          name_collection: string
          profile_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name_collection: string
          profile_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name_collection?: string
          profile_id?: string
        }
      }
      Profile: {
        Row: {
          created_at: string | null
          id: string
          user_name: string
        }
        Insert: {
          created_at?: string | null
          id: string
          user_name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          user_name?: string
        }
      }
      Tasks: {
        Row: {
          created_at: string | null
          id: string
          id_collection: string
          is_completed: boolean
          name_task: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          id_collection: string
          is_completed?: boolean
          name_task: string
        }
        Update: {
          created_at?: string | null
          id?: string
          id_collection?: string
          is_completed?: boolean
          name_task?: string
        }
      }
    }
    Views: {
     /* eslint-disable */
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
    /* eslint-enable */
  }
}
