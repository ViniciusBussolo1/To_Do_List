import { z } from 'zod'

export const schemaHeader = z.object({
  collection: z.string().nonempty('Informe o nome da coleção'),
})
