import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { schemaMain } from './schema'
import { MainProps } from './typeMain'

import { toast } from 'react-toastify'

import supabase from '@/services/supabase'

export const useCollection = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isValid },
  } = useForm<MainProps>({
    mode: 'onChange',
    resolver: zodResolver(schemaMain),
    defaultValues: {
      collection: '',
    },
  })

  const handleAddCollection = async (props: MainProps) => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const collection = props.collection
    const userId = user?.id

    const { data, error } = await supabase
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
  }

  return {
    register,
    errors,
    isValid,
    handleSubmit,
    handleAddCollection,
  }
}
