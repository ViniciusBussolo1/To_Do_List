import supabase from '@/services/supabase'
import { ReactNode, createContext, useState } from 'react'

interface AuthContextDataProps {
  handleSignUp: (email: string, password: string) => void
  dataUser: Object
}

interface AuthContextProvidersProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextDataProps)

export function AuthContextProvider({ children }: AuthContextProvidersProps) {
  const [dataUser, setDataUser] = useState({})

  const handleSignUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.log(error)
    } else {
      window.alert('Usuario registrado com sucesso')
      setDataUser(data)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        handleSignUp,
        dataUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
