'use client'

import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { queryClient } from '@/services/queryClient'
import { QueryClientProvider } from 'react-query'

import './globals.css'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
