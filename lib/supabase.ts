import { createClient } from "@supabase/supabase-js";

export type RsvpInsert = {
  invitee_name: string;
  guest_name: string;
  attendance: string;
  guest_count: number;
  message: string | null;
  created_at: string;
};

type Database = {
  public: {
    Tables: {
      rsvps: {
        Row: RsvpInsert;
        Insert: RsvpInsert;
        Update: Partial<RsvpInsert>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
    })
  : null;
