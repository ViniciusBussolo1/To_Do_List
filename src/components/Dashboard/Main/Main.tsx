'use client'

import { useContext, useEffect } from 'react'
import { ToastContainer } from 'react-toastify'

import { useCollection } from './useCollection'

import 'react-toastify/dist/ReactToastify.css'
import { handleCollectionsContext } from '@/context/handleCollectionsContext'

export default function Main() {
  const { register, handleAddCollection, handleSubmit, errors } =
    useCollection()

  const { handleGetCollections, collections } = useContext(
    handleCollectionsContext,
  )

  useEffect(() => {
    handleGetCollections()
  }, [])

  return (
    <div className="w-full h-full grid-in-main flex justify-center items-center">
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
    </div>
  )
}
