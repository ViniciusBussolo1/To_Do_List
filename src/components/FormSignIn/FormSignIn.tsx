'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

import Link from 'next/link'

import supabase from '@/services/supabase'

export default function FormSignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [dataUser, setDataUser] = useState({})

  const router = useRouter()

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      console.log('Error', error)
    } else {
      setDataUser(data)
      router.push('/Dashboard')
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#121214]">
      <form
        onSubmit={handleSignIn}
        className="w-[400px] h-96 flex flex-col items-center justify-center gap-8 bg-[#202024] px-6 py-2  rounded"
      >
        <h1 className="font-bold text-white text-2xl">Faça seu Login</h1>

        <div className="w-full flex flex-col gap-5">
          <input
            type="email"
            placeholder="E-mail"
            className="bg-[#121214] px-2 py-2 rounded text-white"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-[#121214] px-2 py-2 rounded text-white"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <button
            type="submit"
            className="w-full bg-orange-500 font-semibold rounded px-2 py-2 hover:bg-orange-400 uppercase"
          >
            login
          </button>

          <span className="text-white text-sm">
            Não tem conta?{' '}
            <Link
              href="/SignUp"
              className="text-orange-500 hover:text-orange-400 cursor-pointer hover:underline"
            >
              Registre-se
            </Link>
          </span>
        </div>
      </form>
    </div>
  )
}
