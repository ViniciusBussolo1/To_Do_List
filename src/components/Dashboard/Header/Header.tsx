import { Dispatch, SetStateAction, useState } from 'react'
import { useHeader } from './useHeader'
import { useQuery } from 'react-query'

import * as HoverCard from '@radix-ui/react-hover-card'
import * as AlertDialog from '@radix-ui/react-alert-dialog'

import {
  FolderIcon,
  FolderOpenIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline'
import supabase from '@/services/supabase'

interface headerProps {
  asideOpen: boolean
  setAsideOpen: Dispatch<SetStateAction<boolean>>
}

export default function Header({ asideOpen, setAsideOpen }: headerProps) {
  const [isShown, setIsShown] = useState(false)

  const { handleLogout, errors, handleAddCollection, handleSubmit, register } =
    useHeader()

  const handleUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase.from('Profile').select().eq('id', user?.id)

    return data
  }

  const { data } = useQuery({
    queryKey: ['profile'],
    queryFn: handleUser,
  })

  return (
    <header className="bg-black-700 px-7 py-6 flex items-center justify-between drop-shadow-lg grid-in-header">
      <div
        className="flex items-center gap-2 cursor-pointer"
        onMouseEnter={() => setIsShown(true)}
        onMouseLeave={() => setIsShown(false)}
        onClick={() => setAsideOpen(!asideOpen)}
      >
        {isShown ? (
          <FolderOpenIcon width={24} height={24} className="text-gray-300" />
        ) : (
          <FolderIcon width={24} height={24} className="text-gray-300" />
        )}
        <span className="text-gray-300 text-base">Coleções</span>
      </div>

      <div className="flex gap-4">
        <AlertDialog.Root>
          <AlertDialog.Trigger asChild>
            <PlusSmallIcon
              width={24}
              height={24}
              className="text-white bg-orange-500 rounded cursor-pointer hover:bg-orange-600"
            />
          </AlertDialog.Trigger>
          <AlertDialog.Portal>
            <AlertDialog.Overlay className="inset-0 bg-black-800 opacity-50 fixed" />
            <AlertDialog.Content className="fixed top-[35%] left-[48%] ">
              <div className="min-w-[20.313rem] bg-black-400 px-5 py-5 flex flex-col gap-4 items-start rounded">
                <AlertDialog.Title className="text-white text-lg">
                  Adicione uma coleção
                </AlertDialog.Title>
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
            </AlertDialog.Content>
          </AlertDialog.Portal>
        </AlertDialog.Root>

        <HoverCard.Root>
          {data?.map((item) => {
            return (
              <HoverCard.Trigger asChild key={item.id}>
                <span className="text-gray-300 text-base cursor-pointer hover:text-gray-400">
                  {item.user_name}
                </span>
              </HoverCard.Trigger>
            )
          })}

          <HoverCard.Portal>
            <HoverCard.Content
              className="bg-black-600  py-3 px-3 rounded flex justify-center items-center mr-3 mt-1"
              sideOffset={5}
              onClick={handleLogout}
            >
              <span className="text-gray-300 text-base cursor-pointer hover:text-gray-400">
                Logout
              </span>
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </div>
    </header>
  )
}
