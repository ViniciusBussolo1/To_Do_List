import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaForm } from './schema'
import { FormProps } from '@/@types/typeForm'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

import supabase from '@/services/supabase'

export const useFormSignIn = () => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<FormProps>({
    mode: 'onChange',
    resolver: zodResolver(schemaForm),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const handleSignIn = async (props: FormProps) => {
    const email = props.email
    const password = props.password

    const { error } = await supabase.auth.signInWithPassword({
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
      router.push('/Dashboard')
    }
  }

  return {
    register,
    errors,
    isValid,
    handleSubmit,
    handleSignIn,
  }
}
