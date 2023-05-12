'use client'

import Link from 'next/link'
import { useState } from 'react'

interface FormProps {
  title: string
  buttonText: string
  spanText?: string
  handleFunctionAuth: (email: string, password: string) => void
}

export default function Form({
  title,
  buttonText,
  spanText,
  handleFunctionAuth,
}: FormProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#121214]">
      <form
        onSubmit={handleFunctionAuth}
        className="w-[400px] h-96 flex flex-col items-center justify-center gap-8 bg-[#202024] px-6 py-2  rounded"
      >
        <h1 className="font-bold text-white text-2xl">{title}</h1>

        <div className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="E-mail"
            className="bg-[#121214] px-2 py-2 rounded text-white"
            onChange={(event) => setEmail(event.target.value)}
          />

          <input
            type="password"
            placeholder="Senha"
            className="bg-[#121214] px-2 py-2 rounded text-white"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <button
            type="submit"
            className="w-full bg-orange-500 font-semibold rounded px-2 py-2 hover:bg-orange-400 uppercase"
          >
            {buttonText}
          </button>
          {spanText && (
            <span className="text-white text-sm">
              Não tem conta?{' '}
              <Link
                href="/SignUp"
                className="text-orange-500 hover:text-orange-400 cursor-pointer hover:underline"
              >
                {spanText}
              </Link>
            </span>
          )}
        </div>
        {!spanText && (
          <div className="w-full flex justify-end items-cente">
            <Link
              href="/"
              className="text-sm text-orange-500 hover:underline hover:text-orange-400"
            >
              Voltar
            </Link>
          </div>
        )}
      </form>
    </div>
  )
}
