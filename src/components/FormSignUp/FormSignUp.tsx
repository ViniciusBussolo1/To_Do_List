'use client'

import { useState } from 'react'
import { useFormSignUp } from './useFormSignUp'
import { ToastContainer } from 'react-toastify'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

import Link from 'next/link'

import 'react-toastify/dist/ReactToastify.css'

export default function FormSignUp() {
  const [passwordVisiblity, setPasswordVisiblity] = useState(false)

  const { handleSignUp, handleSubmit, register, errors, isValid } =
    useFormSignUp()

  return (
    <div className="w-screen h-screen flex justify-center items-center bg-black-800">
      <ToastContainer />
      <form
        onSubmit={handleSubmit(handleSignUp)}
        className="w-[400px] flex flex-col items-center justify-center gap-8 bg-black-700 px-6 py-2  rounded"
      >
        <h1 className="font-bold text-white text-2xl">Inscreva-se</h1>

        <div className="w-full flex flex-col gap-5">
          <input
            type="text"
            placeholder="Usuário"
            className="bg-black-800 px-2 py-2 rounded text-white"
            {...register('userName')}
          />
          {errors.userName && (
            <span className="text-sm text-red-500">
              {errors.userName?.message}
            </span>
          )}
          <input
            type="text"
            placeholder="E-mail"
            className="bg-black-800 px-2 py-2 rounded text-white"
            {...register('email')}
          />
          {errors.email && (
            <span className="text-sm text-red-500">
              {errors.email?.message}
            </span>
          )}

          <div className="w-full flex items-center bg-black-800 px-2 py-2 rounded focus-within:outline focus-within:outline-[2px] focus-within:outline-white">
            <input
              type={passwordVisiblity ? 'text' : 'password'}
              placeholder="Senha"
              className="w-full bg-black-800 rounded text-white flex-1 outline-none"
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
          {!isValid ? (
            <button
              disabled={!isValid}
              className="w-full bg-orange-700 font-semibold rounded px-2 py-2 uppercase cursor-not-allowed"
            >
              cadastrar
            </button>
          ) : (
            <button className="w-full bg-orange-500 font-semibold rounded px-2 py-2 uppercase ">
              cadastrar
            </button>
          )}
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
