'use client'
import {signup} from '@/app/register/actions'
import { useActionState, useFormStatus } from 'react'



export default function SignUpForm (){
  const [state, formAction, pending] = useActionState(signup, undefined)

    return (
      <div className="flex items-center justify-center h-screen bg-gray-950">
      <div className="flex flex-col w-full md:w-1/2 xl:w-2/5 2xl:w-2/5 3xl:w-1/3 mx-auto p-8 md:p-10 2xl:p-12 3xl:p-14 bg-[#ffffff] rounded-2xl shadow-xl">
        <div className="flex flex-row gap-3 pb-4">
          <h1 className="text-3xl font-bold text-[#4B5563] my-auto">
            Your Company
          </h1>
        </div>
        <div className="text-sm font-light text-[#6B7280] pb-8">
          Login to your account on Your Company.
        </div>
        <form action={formAction} className="flex flex-col">
          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Nombre
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                  aria-label="Email icon"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>

              <input
                type="text"
                name="user"
                id="text"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="your name"
                autoComplete="off"
              />
              
            </div>
            <div className='text-red-600'>
              {state?.errors?.user && <p>{state.errors.user}</p>}
            </div>
            
          </div>

          <div className="pb-2">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Email
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-mail"
                  aria-label="Email icon"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2"></rect>
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path>
                </svg>
              </span>

              <input
                type="email"
                name="email"
                id="email"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                placeholder="name@company.com"
                autoComplete="off"
              />
              
            </div>
            <div className='text-red-600'>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
          </div>
          <div className="pb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-[#111827]"
            >
              Password
            </label>
            <div className="relative text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center p-1 pl-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-square-asterisk"
                  aria-label="Password icon"
                >
                  <rect width="18" height="18" x="3" y="3" rx="2"></rect>
                  <path d="M12 8v8"></path>
                  <path d="m8.5 14 7-4"></path>
                  <path d="m8.5 10 7 4"></path>
                </svg>
              </span>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="pl-12 mb-2 bg-gray-50 text-gray-600 border focus:border-transparent border-gray-300 sm:text-sm rounded-lg ring ring-transparent focus:ring-1 focus:outline-none focus:ring-gray-400 block w-full p-2.5 rounded-l-lg py-3 px-4"
                autoComplete="new-password"
              />
           
              
            </div>
            <div className='text-red-600'>
            {state?.errors?.password && (
        <div>
          <p className='text-black'>Password must:</p>
          <ul>
            {state.errors.password.map((error) => (
              <li key={error}>- {error}</li>
            ))}
          </ul>
        </div>
      )}
            </div>
          </div>
          <button
            disabled={pending}
            type="submit"
            className="w-full text-[#FFFFFF] bg-[#4F46E5] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-6"
          >
            {pending ? 'enviando...': 'Send'}
          </button>
          <div className="text-sm font-light text-[#6B7280] text-center">
            Tienes problemas para ingresar?{" "}
            <a href="#" className="font-medium text-[#4F46E5] hover:underline">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
    )
}

