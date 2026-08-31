import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function supabaseUrl() {
  return process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
}

function supabaseServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY
}

export function hasSupabaseConfig() {
  return Boolean(supabaseUrl() && supabaseServiceRoleKey())
}

export function getSupabaseAdmin(): SupabaseClient | null {
  const url = supabaseUrl()
  const key = supabaseServiceRoleKey()
  if (!url || !key) return null

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function requireSupabaseAdmin(): SupabaseClient {
  const client = getSupabaseAdmin()
  if (!client) {
    throw new Error(
      'Supabase is not configured. Add SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY to your environment, run supabase/planted-memories.sql in the Supabase SQL editor, then redeploy.',
    )
  }
  return client
}
