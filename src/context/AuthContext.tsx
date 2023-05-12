'use client'

import { ReactNode, createContext, useState } from 'react'

interface AuthContextDataProps {
  dataUser: Object
}

interface AuthContextProvidersProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProvidersProps) {
  const [dataUser, setDataUser] = useState({})

  return (
    <AuthContext.Provider
      value={{
        dataUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
