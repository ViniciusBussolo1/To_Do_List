import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { TasksProps } from './typeTasks'
import { schemaTasks } from './shema'

import supabase from '@/services/supabase'

export const useTasks = (nameCollection: string) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
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

    const { data: Collections } = await supabase
      .from('Collections')
      .select()
      .eq('profile_id', userId)
      .eq('name_collection', nameCollection)

    const taskId = Collections?.find((item) => item.profile_id === userId)

    const { error } = await supabase.from('Tasks').insert([
      {
        name_task: task,
        is_completed: false,
        id_collection: taskId!.id,
      },
    ])

    if (error) {
      console.log(error)
      toast.error('Erro ao criar a tarefa.', {
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
      toast.success('Tarefa criada com sucesso.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
      window.location.reload()
    }

    reset()
  }

  return {
    register,
    errors,
    handleSubmit,
    handleAddTask,
  }
}
