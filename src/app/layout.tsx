import { ReactNode } from 'react'
import { Roboto } from 'next/font/google'
import { AuthContextProvider } from '@/context/AuthContext'

import './globals.css'

const roboto = Roboto({ weight: ['400', '700'], subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body className={roboto.className}>{children}</body>
      </html>
    </AuthContextProvider>
  )
}
