import { Database } from './db_types'

export type Collection = Database['public']['Tables']['Collections']['Row']
export type Task = Database['public']['Tables']['Tasks']['Row']
