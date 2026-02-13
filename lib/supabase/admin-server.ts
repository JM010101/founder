import { createClient } from '@supabase/supabase-js'

/**
 * Admin server client using service role key or secret key
 * This bypasses Row Level Security (RLS) and should ONLY be used in server-side API routes
 * NEVER expose these keys to the client
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  
  // Prefer secret key (new format) if available, fallback to service role key
  const adminKey = process.env.SUPABASE_SECRET_KEY || 
                   process.env.SUPABASE_SERVICE_ROLE_KEY!

  if (!adminKey) {
    throw new Error('SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY must be set')
  }

  return createClient(supabaseUrl, adminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
