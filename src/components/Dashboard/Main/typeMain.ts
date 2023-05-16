import { z } from 'zod'
import { schemaMain } from './schema'

export type MainProps = z.infer<typeof schemaMain>
