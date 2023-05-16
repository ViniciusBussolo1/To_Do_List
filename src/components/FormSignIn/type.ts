import { schemaForm } from '@/components/FormSignIn/schema'
import { z } from 'zod'

export type FormProps = z.infer<typeof schemaForm>
