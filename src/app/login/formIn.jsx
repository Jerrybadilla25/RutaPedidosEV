"use client";
import { signIn } from "@/app/login/actions";
import { useActionState, useFormStatus } from "react";

export default function SignInForm() {
  const [state, formAction, pending] = useActionState(signIn, undefined);
  return (
    <div className="full-screen-center">
     
        
        <form action={formAction} className="flex-form-border">
        <h1 className="mb-3">Your Company</h1>
          <div className="mb-2">Login to your account on Your Company.</div>

          <div className="flex-colunm W-100">
            
              <label htmlFor="email" className="">
                Email
              </label>
            
            <div className="flex-row gap-medium mb-1 W-100">
              
              <input
                type="email"
                name="email"
                id="email"
                className="input-logo W-100"
                placeholder="name@company.com"
                autoComplete="on"
              />
            </div>

            <div className="flex-row">
              {state?.errors?.email && <p>{state.errors.email}</p>}
            </div>
          </div>
          <div className="flex-colunm">
            <label htmlFor="password" className="">
              Password
            </label>
            <div className="flex-row gap-medium mb-1">
            
              <input
                type="password"
                name="password"
                id="password"
                placeholder="••••••••••"
                className="input-logo W-100"
              />
            </div>
            <div className="flex-row">
              {state?.errors?.password && (
                <div>
                  <p className="">Password must:</p>
                  <ul>
                    {state.errors.password.map((error) => (
                      <li key={error}>- {error}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
          <div className="flex-row w-100">
          <button
            disabled={pending}
            type="submit"
            className="flex-row btn btn-blue W-100"
          >
            {pending ? "enviando..." : "Send"}
          </button>
          </div>
          
          <div className="flex-row">
            Tienes problemas para ingresar?{" "}
            <a href="#" className="">
              Sign Up
            </a>
          </div>
        </form>
      
    </div>
  );
}
