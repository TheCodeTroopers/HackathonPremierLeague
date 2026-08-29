import { createClient } from "@supabase/supabase-js";

const supabase_url = import.meta.env.VITE_SUPABASE_URL || '';
const supabase_key = import.meta.env.VITE_SUPABASE_KEY || '';

if (!supabase_url || !supabase_key) {
  console.warn(
    '[HPL] Missing VITE_SUPABASE_URL or VITE_SUPABASE_KEY in .env file. Please add your credentials to .env to enable registration database features.'
  );
}

// Fallback to placeholder client to prevent top-level runtime crash
export const supabase = createClient(
  supabase_url || 'https://placeholder-project.supabase.co',
  supabase_key || 'placeholder-anon-key'
);