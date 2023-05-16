import {
  FolderIcon,
  FolderOpenIcon,
  PlusSmallIcon,
} from '@heroicons/react/24/outline'

import { Dispatch, SetStateAction, useState } from 'react'

interface headerProps {
  asideOpen: boolean
  setAsideOpen: Dispatch<SetStateAction<boolean>>
}

export default function Header({ asideOpen, setAsideOpen }: headerProps) {
  const [isShown, setIsShown] = useState(false)
  return (
    <header className="bg-black-700 px-6 py-6 flex items-center justify-between drop-shadow-lg">
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
        <span className="text-gray-300 text-base cursor-pointer hover:text-gray-400">
          Vinicius
        </span>
      </div>
    </header>
  )
}
