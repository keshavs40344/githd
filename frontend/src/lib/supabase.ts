import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface MentorSessionRecord {
  id?: string;
  problem_description: string;
  dominant_guna: 'Sattva' | 'Rajas' | 'Tamas';
  root_cause_analysis: string;
  target_shloka: string;
  sanskrit_excerpt: string;
  strategic_action_plan: string;
  model: string;
  execution_time_ms: number;
  created_at?: string;
}

export interface SavedVerseRecord {
  id?: string;
  user_id?: string;
  chapter: number;
  verse: number;
  contemplated?: boolean;
  notes?: string;
  created_at?: string;
}

/**
 * Log AI Mentor conversation to Supabase PostgreSQL database
 */
export async function saveMentorSession(session: MentorSessionRecord) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  try {
    const { data, error } = await supabase
      .from('mentor_sessions')
      .insert([session])
      .select();
    if (error) throw error;
    return { success: true, data };
  } catch (err: any) {
    console.warn('Supabase saveMentorSession error:', err?.message || err);
    return { success: false, error: err?.message || err };
  }
}

/**
 * Fetch saved sessions history
 */
export async function getMentorSessions(limit = 20) {
  if (!supabase) return [];
  try {
    const { data, error } = await supabase
      .from('mentor_sessions')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    if (error) throw error;
    return data || [];
  } catch (err) {
    console.warn('Supabase getMentorSessions error:', err);
    return [];
  }
}
