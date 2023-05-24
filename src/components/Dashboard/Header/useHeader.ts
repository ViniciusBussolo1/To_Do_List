import { useRouter } from 'next/navigation'

import supabase from '@/services/supabase'

export const useHeader = () => {
  const router = useRouter()

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
  }
}
