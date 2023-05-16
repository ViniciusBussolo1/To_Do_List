import { z } from 'zod'

export const schemaMain = z.object({
  collection: z.string().nonempty('Informe o nome da coleção'),
})
