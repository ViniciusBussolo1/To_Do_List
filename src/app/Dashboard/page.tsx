'use client'

import { useState } from 'react'

import Header from '@/components/Dashboard/Header/Header'
import Aside from '@/components/Dashboard/Aside/Aside'
import Main from '@/components/Dashboard/Main/Main'

export default function Dashboard() {
  const [asideOpen, setAsideOpen] = useState(false)

  return (
    <div className="w-screen h-screen bg-black-800 overflow-hidden grid grid-areas-layout grid-cols-layout grid-rows-layout">
      <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
      <Aside asideOpen={asideOpen} />
      <Main />
    </div>
  )
}
