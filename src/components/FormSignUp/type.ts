import { schemaForm } from '@/components/FormSignUp/schema'
import { z } from 'zod'

export type FormProps = z.infer<typeof schemaForm>
