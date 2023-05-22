'use client'

import supabase from '@/services/supabase'
import { Collection } from '@/services/types/collections'
import { createContext, ReactNode, useState } from 'react'

interface HandleCollectionsContextProviderProps {
  children: ReactNode
}

interface handleConllectionsContextDataProps {
  handleGetCollections: () => void
  collections: Array<Collection> | null
}

export const handleCollectionsContext = createContext(
  {} as handleConllectionsContextDataProps,
)

export function HandleCollectionsContextProvider({
  children,
}: HandleCollectionsContextProviderProps) {
  const [collections, setCollections] = useState<Collection[] | null>([])

  const handleGetCollections = async () => {
    const { data } = await supabase.from('Collections').select()

    setCollections(data)
  }

  console.log(collections)

  return (
    <handleCollectionsContext.Provider
      value={{ handleGetCollections, collections }}
    >
      {children}
    </handleCollectionsContext.Provider>
  )
}
