import { createClient } from '@supabase/supabase-js'

import type { Database } from './types/db_types'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string
const supabaseAnonKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd3bmt1ZmF2a3J6aHBldGtuc2tuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODM3MzU0NzUsImV4cCI6MTk5OTMxMTQ3NX0.R4iAEV_5ohNA9CztwtAfKFtw-gxa6fMg8vgplOg7fNc'

const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

export default supabase
