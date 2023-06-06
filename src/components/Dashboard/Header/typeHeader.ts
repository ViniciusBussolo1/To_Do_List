import { z } from 'zod'
import { schemaHeader } from './schema'

export type HeaderProps = z.infer<typeof schemaHeader>
