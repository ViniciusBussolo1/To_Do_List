import { useRouter } from 'next/navigation'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { schemaHeader } from '../Header/schema'
import { HeaderProps } from './typeHeader'
import { toast } from 'react-toastify'

import supabase from '@/services/supabase'

export const useHeader = () => {
  const router = useRouter()

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<HeaderProps>({
    mode: 'onChange',
    resolver: zodResolver(schemaHeader),
    defaultValues: {
      collection: '',
    },
  })

  const handleAddCollection = async (props: HeaderProps) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const collection = props.collection
    const userId = user?.id

    const { error } = await supabase
      .from('Collections')
      .insert([{ name_collection: collection, profile_id: userId! }])

    if (error) {
      console.log(error)
      toast.error('Erro ao criar a coleção.', {
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
      toast.success('Coleção criada com sucesso.', {
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

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.log(error)
    } else {
      router.push('/')
    }
  }

  return {
    handleLogout,
    handleSubmit,
    register,
    errors,
    handleAddCollection,
  }
}
