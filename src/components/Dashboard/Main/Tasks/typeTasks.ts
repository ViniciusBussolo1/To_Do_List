import { z } from 'zod'
import { schemaTasks } from './shema'

export type TasksProps = z.infer<typeof schemaTasks>
