import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANONYMOUS_KEY;

// Export a flag to check if Supabase is configured
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn('Supabase URL or Anonymous Key is missing. The app will use static data as a fallback.');
}

// Initialize the client only if keys are present, otherwise export a dummy client
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: [], error: null }),
          eq: () => Promise.resolve({ data: [], error: null }),
        }),
        insert: () => Promise.resolve({ error: new Error('Supabase not configured') }),
        update: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
        delete: () => ({ eq: () => Promise.resolve({ error: new Error('Supabase not configured') }) }),
      })
    } as any;

if (!supabase.auth) {
  (supabase as any).auth = {
    signInWithPassword: () => Promise.resolve({ error: { message: 'Supabase not configured' } }),
    getSession: () => Promise.resolve({ data: { session: null }, error: null }),
    signOut: () => Promise.resolve({ error: null }),
  };
}
