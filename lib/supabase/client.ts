import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  // Prefer publishable key (new format) if available, fallback to anon key
  const apiKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
                 process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    apiKey
  )
}
