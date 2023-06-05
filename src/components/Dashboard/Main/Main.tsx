'use client'

import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'
import { useMain } from './useMain'

import supabase from '@/services/supabase'

import 'react-toastify/dist/ReactToastify.css'

export default function Main() {
  const { register, handleAddCollection, handleSubmit, errors } = useMain()

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
          <div className="min-w-[20.313rem] bg-black-400 px-5 py-5 flex flex-col gap-4 items-start rounded">
            <h3 className="text-white text-lg">Adicione uma coleção </h3>
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
        <div></div>
      )}
    </div>
  )
}
