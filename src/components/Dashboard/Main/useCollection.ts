import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { schemaMain } from './schema'

import { toast } from 'react-toastify'

import supabase from '@/services/supabase'
import { MainProps } from './typeMain'

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

  const handleAddCollection = async (props: MainProps) => {}

  return {
    register,
    errors,
    isValid,
    handleSubmit,
  }
}
