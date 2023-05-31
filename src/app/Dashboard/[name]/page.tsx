'use client'

import Aside from '@/components/Dashboard/Aside/Aside'
import Header from '@/components/Dashboard/Header/Header'
import Tasks from '@/components/Dashboard/Main/Tasks/Tasks'

import { useState } from 'react'

interface CollectionProps {
  params: {
    name: string
  }
}

export default function Page({ params }: CollectionProps) {
  const [asideOpen, setAsideOpen] = useState(false)
  return (
    <div className="w-screen h-screen bg-black-800 overflow-hidden grid grid-areas-layout grid-cols-layout grid-rows-layout">
      <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
      <Aside asideOpen={asideOpen} />
      <div className="w-full h-full grid-in-main flex justify-center items-center">
        <Tasks params={params} />
      </div>
    </div>
  )
}
