import { createClient, User, Session, AuthError } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      }
    })
  : null;

export interface UserProfile {
  id: string;
  email?: string;
  name?: string;
  sadhana_streak?: number;
  karma_points?: number;
  created_at?: string;
}

export interface MentorSessionRecord {
  id?: string;
  user_id?: string;
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

// ── AUTHENTICATION METHODS ──────────────────────────────────────────

/**
 * Sign up with Email and Password
 */
export async function signUpWithEmail(email: string, password: string, fullName?: string) {
  if (!supabase) return { data: { user: null, session: null }, error: new Error('Supabase is not configured') as unknown as AuthError };
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || 'साधक (Sadhaka)',
      }
    }
  });
}

/**
 * Sign in with Email and Password
 */
export async function signInWithEmail(email: string, password: string) {
  if (!supabase) return { data: { user: null, session: null }, error: new Error('Supabase is not configured') as unknown as AuthError };
  return await supabase.auth.signInWithPassword({
    email,
    password
  });
}

/**
 * Send Magic Link / OTP Email Verification
 */
export async function sendMagicLink(email: string) {
  if (!supabase) return { data: { user: null, session: null }, error: new Error('Supabase is not configured') as unknown as AuthError };
  return await supabase.auth.signInWithOtp({
    email,
    options: {
      shouldCreateUser: true,
    }
  });
}

/**
 * Verify OTP Token code
 */
export async function verifyOtpToken(email: string, token: string) {
  if (!supabase) return { data: { user: null, session: null }, error: new Error('Supabase is not configured') as unknown as AuthError };
  return await supabase.auth.verifyOtp({
    email,
    token,
    type: 'email'
  });
}

/**
 * Sign Out
 */
export async function signOutUser() {
  if (!supabase) return { error: null };
  return await supabase.auth.signOut();
}

/**
 * Get Active Session & User
 */
export async function getCurrentUser(): Promise<User | null> {
  if (!supabase) return null;
  try {
    const { data: { user } } = await supabase.auth.getUser();
    return user;
  } catch {
    return null;
  }
}

// ── DATABASE LOGGING ───────────────────────────────────────────────

/**
 * Log AI Mentor conversation to Supabase PostgreSQL database
 */
export async function saveMentorSession(session: MentorSessionRecord) {
  if (!supabase) return { success: false, error: 'Supabase not configured' };
  try {
    const user = await getCurrentUser();
    const payload = {
      ...session,
      user_id: user?.id || null
    };

    const { data, error } = await supabase
      .from('mentor_sessions')
      .insert([payload])
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
