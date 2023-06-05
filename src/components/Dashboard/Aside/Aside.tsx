'use client'

import { useQuery } from 'react-query'

import supabase from '@/services/supabase'
import Link from 'next/link'

interface asideProps {
  asideOpen: boolean
}

export default function Aside({ asideOpen }: asideProps) {
  const getCollections = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const { data } = await supabase
      .from('Collections')
      .select()
      .eq('profile_id', user?.id)

    return data
  }

  const { data } = useQuery({
    queryKey: ['collections'],
    queryFn: getCollections,
  })

  return (
    <aside
      className={`bg-black-700 h-screen flex flex-col gap-6 pt-8 ${
        !asideOpen ? 'w-64' : 'w-0 px-0 py-0'
      } duration-700 grid-in-nav`}
    >
      <h2
        className={`text-white text-xl origin-left ml-5 ${
          asideOpen && 'scale-0'
        } duration-500`}
      >
        Coleções
      </h2>
      <div className="w-full">
        {data?.length === 0 ? (
          <span className="text-white px-5 flex justify-center ">
            Voce ainda não possui nenhuma coleção
          </span>
        ) : (
          <ul className="flex flex-col">
            {data?.map((item) => {
              return (
                <Link
                  href={`Dashboard/${item.name_collection}`}
                  key={item.id}
                  className={`text-white px-10 py-5 cursor-pointer hover:bg-black-600 ${
                    asideOpen && 'scale-0'
                  } duration-500`}
                >
                  {item.name_collection}
                </Link>
              )
            })}
          </ul>
        )}
      </div>
    </aside>
  )
}
