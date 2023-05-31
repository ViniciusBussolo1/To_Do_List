import { z } from 'zod'

export const schemaTasks = z.object({
  task: z.string().nonempty('Informe o nome da tarefa'),
})
