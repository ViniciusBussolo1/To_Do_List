'use client'

import { useState } from 'react'

import Header from '@/components/Header/Header'
import Aside from '@/components/Aside/Aside'

export default function Dashboard() {
  const [asideOpen, setAsideOpen] = useState(true)

  return (
    <div className="w-screen h-screen bg-black-800 overflow-hidden">
      <Header asideOpen={asideOpen} setAsideOpen={setAsideOpen} />
      <Aside asideOpen={asideOpen} />
    </div>
  )
}
