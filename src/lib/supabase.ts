import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Defensive check to prevent crash on initialization
const isSupabaseConfigured =
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl !== 'your_supabase_url' &&
    supabaseUrl.startsWith('https://');

if (!isSupabaseConfigured) {
    console.warn('Supabase is not configured yet. Some features will be disabled.');
}

export const supabase = isSupabaseConfigured
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null as any; // Using 'any' here as a fallback; components will check if it exists
