export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: number
          name: string | null
          subscriptions: string[]
        }
        Insert: {
          created_at?: string
          email: string
          id?: number
          name?: string | null
          subscriptions: string[]
        }
        Update: {
          created_at?: string
          email?: string
          id?: number
          name?: string | null
          subscriptions?: string[]
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
