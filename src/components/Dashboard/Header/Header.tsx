import { Dispatch, SetStateAction, useState } from 'react'

import * as HoverCard from '@radix-ui/react-hover-card'

import {
  FolderIcon,
  FolderOpenIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline'
import { useHeader } from './useHeader'
import supabase from '@/services/supabase'
import { useQuery } from 'react-query'

interface headerProps {
  asideOpen: boolean
  setAsideOpen: Dispatch<SetStateAction<boolean>>
}

export default function Header({ asideOpen, setAsideOpen }: headerProps) {
  const [isShown, setIsShown] = useState(false)

  const { handleLogout } = useHeader()

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
        <PlusSmallIcon
          width={24}
          height={24}
          className="text-white bg-orange-500 rounded cursor-pointer hover:bg-orange-600"
        />
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
