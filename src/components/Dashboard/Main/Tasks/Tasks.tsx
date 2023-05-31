'use client'
import {
  ChevronLeftIcon,
  EllipsisHorizontalIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline'
import { useTasks } from './useTasks'
import supabase from '@/services/supabase'
import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'

import 'react-toastify/dist/ReactToastify.css'

interface RouterProps {
  params: {
    name: string
  }
}

export default function Tasks({ params }: RouterProps) {
  const { errors, handleAddTask, handleSubmit, register } = useTasks(
    params.name,
  )

  const getTasks = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data: Tasks } = await supabase
      .from('Collections')
      .select()
      .eq('profile_id', user?.id)
      .eq('name_collection', params.name)

    const task = Tasks?.find((item) => item.name_collection === params.name)

    const { data } = await supabase
      .from('Tasks')
      .select()
      .eq('id_collection', task?.id)

    return data
  }

  const { data } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  })

  return (
    <div className="w-[50%] h-screen py-10 flex flex-col gap-11">
      <ToastContainer />
      <div className="w-full flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="text-white ">
            <div className="bg-black-600 rounded-lg px-2 py-2 cursor-pointer flex justify-center items-center">
              <ChevronLeftIcon width={18} height={18} />
            </div>
          </div>

          <h1 className="text-white text-2xl">{params.name}</h1>
        </div>
        <span className="text-white">
          <EllipsisHorizontalIcon
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </span>
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(handleAddTask)}
          className="flex flex-col gap-2"
        >
          <div className="w-full flex items-center gap-3 bg-black-800 px-2 py-3 rounded-xl focus-within:outline focus-within:outline-[2px] focus-within:outline-gray-600">
            <PlusSmallIcon
              width={24}
              height={24}
              className="text-white bg-orange-500 rounded-lg cursor-pointer"
            />
            <input
              type="text"
              placeholder="Adicionar tarefa"
              className="bg-black-800 w-full outline-none text-white"
              {...register('task')}
            />
          </div>
          {errors.task && (
            <span className="text-sm text-red-500">{errors.task?.message}</span>
          )}
        </form>
      </div>
      <div className="flex flex-col gap-4">
        <div>
          <span className="text-white">Tarefas - {data?.length}</span>
        </div>
        <div className="w-full flex flex-col gap-4">
          {data?.map((item) => (
            <div
              key={item.id}
              className="bg-black-600 flex items-center justify-start gap-4 rounded-xl px-4 py-4 "
            >
              <span className="text-white">0</span>
              <span className="text-white text-base">{item.name_task}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
