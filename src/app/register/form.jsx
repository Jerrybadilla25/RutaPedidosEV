'use client'
import {signup} from '@/app/register/actions'
import { useActionState, useFormStatus } from 'react'



export default function SignUpForm (){
  const [state, formAction, pending] = useActionState(signup, undefined)

    return (
      <div className="">
      <div className="">
        <div className="">
          <h1 className="">
            Your Company
          </h1>
        </div>
        <div className="">
          Login to your account on Your Company.
        </div>
        <form action={formAction} className="">
          <div className="">
            <label
              htmlFor="email"
              className=""
            >
              Nombre
            </label>
            <div className="r">
              <span className="">
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
                  className=""
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
                className=""
                placeholder="your name"
                autoComplete="off"
              />
              
            </div>
            <div className='text-red-600'>
              {state?.errors?.user && <p>{state.errors.user}</p>}
            </div>
            
          </div>

          <div className="">
            <label
              htmlFor="email"
              className=""
            >
              Email
            </label>
            <div className="">
              <span className="">
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
                  className=""
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
                className=""
                placeholder="name@company.com"
                autoComplete="off"
              />
              
            </div>
            <div className=''>
            {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
          </div>
          <div className="">
            <label
              htmlFor="password"
              className=""
            >
              Password
            </label>
            <div className="">
              <span className="">
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
                  className=""
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
                className=""
                autoComplete="new-password"
              />
           
              
            </div>
            <div className=''>
            {state?.errors?.password && (
        <div>
          <p className=''>Password must:</p>
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
            className=""
          >
            {pending ? 'enviando...': 'Send'}
          </button>
          <div className="">
            Tienes problemas para ingresar?{" "}
            <a href="#" className="">
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </div>
    )
}

