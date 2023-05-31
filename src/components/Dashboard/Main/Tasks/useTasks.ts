import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { TasksProps } from './typeTasks'
import { MainProps } from '../typeMain'
import { schemaTasks } from './shema'

import supabase from '@/services/supabase'

export const useTasks = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<TasksProps>({
    mode: 'onChange',
    resolver: zodResolver(schemaTasks),
    defaultValues: {
      task: '',
    },
  })

  const handleAddTask = async (props: TasksProps) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const task = props.task
    const userId = user?.id

    const { data: Tasks } = await supabase
      .from('Collections')
      .select('id')
      .eq('profile_id', userId)

    const { error } = await supabase
      .from('Tasks')
      .insert([{ name_task: task, is_completed: false }])

    if (error) {
      console.log(error)
      toast.error('Erro ao criar a coleção.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      toast.success('Coleção criada com sucesso.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }
  }

  return {
    register,
    errors,
    handleSubmit,
    handleAddTask,
  }
}
