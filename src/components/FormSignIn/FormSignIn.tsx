'use client'
import { useState } from 'react'

import { useFormSignIn } from './useFormSignIn'
import { ToastContainer } from 'react-toastify'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css'

export default function FormSignIn() {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false)

  const { errors, handleSignIn, handleSubmit, register, isValid } =
    useFormSignIn()

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-[#121214]">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(handleSignIn)}
        className="w-[400px] h-96 flex flex-col items-center justify-center gap-8 bg-[#202024] px-6 py-2  rounded"
      >
        <h1 className="font-bold text-white text-2xl">Faça seu Login</h1>

        <div className="w-full flex flex-col gap-5">
          <input
            type={'text'}
            placeholder="E-mail"
            className="bg-[#121214] px-2 py-2 rounded text-white"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>
          )}

          <div className="w-full flex items-center bg-[#121214] px-2 py-2 rounded focus-within:outline focus-within:outline-[2px] focus-within:outline-white">
            <input
              type={passwordVisiblity ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full bg-[#121214] rounded text-white flex-1 outline-none"
              {...register('password')}
            />
            {passwordVisiblity ? (
              <EyeIcon
                width={24}
                height={24}
                className="text-orange-500"
                onClick={() => setPasswordVisiblity(!passwordVisiblity)}
              />
            ) : (
              <EyeSlashIcon
                width={24}
                height={24}
                className="text-orange-500"
                onClick={() => setPasswordVisiblity(!passwordVisiblity)}
              />
            )}
          </div>
          {errors.password && (
            <span className="text-sm text-red-500">
              {errors.password?.message}
            </span>
          )}
        </div>

        <div className="w-full flex flex-col items-center gap-3">
          <div className="w-full flex flex-col items-center gap-3">
            {!isValid ? (
              <button
                disabled={!isValid}
                className="w-full bg-orange-700 font-semibold rounded px-2 py-2 uppercase cursor-not-allowed"
              >
                login
              </button>
            ) : (
              <button className="w-full bg-orange-500 font-semibold rounded px-2 py-2 uppercase ">
                login
              </button>
            )}
          </div>

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
