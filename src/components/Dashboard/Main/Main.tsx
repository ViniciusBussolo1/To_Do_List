'use client'

import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'

import { useCollection } from './useCollection'

import supabase from '@/services/supabase'

import {
  PlusSmallIcon,
  EllipsisHorizontalIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline'

import 'react-toastify/dist/ReactToastify.css'

export default function Main() {
  const { register, handleAddCollection, handleSubmit, errors } =
    useCollection()

  const getCollection = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase
      .from('Collections')
      .select()
      .eq('profile_id', user?.id)

    return data
  }

  const { data } = useQuery({
    queryKey: ['collection'],
    queryFn: getCollection,
  })

  return (
    <div className="w-full h-full grid-in-main flex justify-center items-center">
      {data?.length === 0 ? (
        <>
          <ToastContainer />
          <div className="bg-black-400 px-5 py-5 flex flex-col gap-4 items-start rounded">
            <h3 className="text-white text-lg">
              Você ainda não tem nenhuma coleção{' '}
            </h3>
            <form
              onSubmit={handleSubmit(handleAddCollection)}
              className="flex flex-col gap-4 w-full"
            >
              <input
                type="text"
                placeholder="Informe o nome da coleção"
                className="w-full bg-black-800 rounded text-white px-2 py-2"
                {...register('collection')}
              />
              {errors.collection && (
                <span className="text-sm text-red-500">
                  {errors.collection?.message}
                </span>
              )}

              <button className="text-xs font-semibold bg-orange-500 px-1 py-2 rounded hover:bg-orange-600">
                Adicionar uma coleção
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="w-[50%] h-screen py-10 flex flex-col gap-11">
          <div className="w-full flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="text-white ">
                <div className="bg-black-600 rounded-lg px-2 py-2 cursor-pointer flex justify-center items-center">
                  <ChevronLeftIcon width={18} height={18} />
                </div>
              </div>
              <h1 className="text-white text-2xl">Design</h1>
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
            <form action="">
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
                />
              </div>
            </form>
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <span className="text-white">Tarefas - 8</span>
            </div>
            <div className="w-full flex flex-col gap-4">
              <div className="bg-black-600 flex items-center justify-start gap-4 rounded-xl px-4 py-4 ">
                <span className="text-white">0</span>
                <span className="text-white text-base">
                  dsadsadasdasddasdasda
                </span>
              </div>
              <div className="bg-black-600 flex items-center justify-start gap-4 rounded-xl px-4 py-4 ">
                <span className="text-white">0</span>
                <span className="text-white text-base">
                  dsadsadasdasddasdasda
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
