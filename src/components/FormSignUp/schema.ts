import { z } from 'zod'

export const schemaForm = z.object({
  userName: z.string().nonempty('O nome de usuário é obrigatório'),
  email: z
    .string()
    .email('Informe um E-mail correto')
    .nonempty('O E-mail é obrigatório'),
  password: z
    .string()
    .nonempty('A senha é obrigatório')
    .min(6, 'A senha deve conter no mínimo 6 caracteres'),
})
