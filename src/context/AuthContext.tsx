'use client'

import { ReactNode, createContext, useState } from 'react'

import supabase from '@/services/supabase'

interface DataProfileProps {
  user: {
    id: string
    created_at: string
    user_name: string
  }[]
}

interface AuthContextDataProps {
  handleAddProfile: (data: Object, userName: string) => void
}

interface AuthContextProvidersProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProvidersProps) {
  const [useData, setUserData] = useState()

  const handleAddProfile = async (dataProps: any, userName: string) => {
    const { data, error } = await supabase
      .from('Profile')
      .insert({ id: dataProps.user.id, user_name: userName })
      .select()

    if (error) {
      console.log(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleAddProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
