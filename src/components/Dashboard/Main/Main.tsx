'use client'

import { useCollection } from './useCollection'

export default function Main() {
  const { register } = useCollection()

  return (
    <div className="w-full h-full grid-in-main flex justify-center items-center">
      <div className="bg-black-400 px-5 py-5 flex flex-col gap-4 items-start rounded">
        <h3 className="text-white text-lg">
          Você ainda não tem nenhuma coleção{' '}
        </h3>
        <form className="flex flex-col gap-4 w-full">
          <input
            type="text"
            placeholder="Informe o nome da coleção"
            className="w-full bg-black-800 rounded text-white px-2 py-2"
            {...register('collection')}
          />
          <button className="text-xs font-semibold bg-orange-500 px-1 py-2 rounded hover:bg-orange-600">
            Adicionar uma coleção
          </button>
        </form>
      </div>
    </div>
  )
}
