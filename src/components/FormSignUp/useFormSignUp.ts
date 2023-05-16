import { FormProps } from './type'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaForm } from './schema'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthContext'

import { toast } from 'react-toastify'

import supabase from '@/services/supabase'

export const useFormSignUp = () => {
  const { handleAddProfile } = useContext(AuthContext)

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
    reset,
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignUp = async (props: FormProps) => {
    const email = props.email
    const password = props.password
    const userName = props.userName

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      toast.error('E-mail ou senha inválidos.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    } else {
      handleAddProfile(data, userName)
      toast.success('Usuário criado com sucesso.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'dark',
      })
    }

    reset()
  }

  return {
    register,
    errors,
    isValid,
    handleSubmit,
    handleSignUp,
  }
}
