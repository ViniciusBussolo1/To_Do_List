'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'

import supabase from '@/services/supabase'

export default function FormSignUp() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault()
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) {
      console.log('Error', error)
    } else {
      window.alert('Usuario registrado com sucesso')
    }
  }

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#121214]">
      <form
        onSubmit={handleSignUp}
        className="w-[400px] h-96 flex flex-col items-center justify-center gap-8 bg-[#202024] px-6 py-2  rounded"
      >
        <h1 className="font-bold text-white text-2xl">Inscreva-se</h1>

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
            cadastrar
          </button>
        </div>

        <div className="w-full flex justify-end items-cente">
          <Link
            href="/"
            className="text-sm text-orange-500 hover:underline hover:text-orange-400"
          >
            Voltar
          </Link>
        </div>
      </form>
    </div>
  )
}
