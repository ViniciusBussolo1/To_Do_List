'use client'

import supabase from '@/services/supabase'
import { ReactNode, createContext } from 'react'

interface AuthContextDataProps {
  handleAddProfile: (data: Object, userName: string) => void
}

interface AuthContextProvidersProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProvidersProps) {
  const handleAddProfile = async (data: any, userName: string) => {
    const { error } = await supabase
      .from('Profile')
      .insert({ id: data.user.id, user_name: userName })

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
