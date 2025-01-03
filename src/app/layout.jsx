import localFont from "next/font/local";
import "./globals.css";
import './local.css'
//import NavPrincipal from "@/components/navprincipal";
//import Header from "@/components/header";
//import Register from '@/components/actions/formRegister'
//import {validateUser} from '@/utils/auth'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

/*

const register = (children, getUser)=>{
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
      >
        <Register getUser={getUser}/>
        {children}
      </body>
    </html>
  )
} 
  


const userAuth = (children)=>{
  return (
    <html lang="en">
    <body
      className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950`}
    >
      <div className="mx-2">
        <div className="grid grid-rows-1">
          <Header />
        </div>
        <div className="grid grid-cols-4">
          <div className="col-span-1">
            {" "}
            <NavPrincipal />{" "}
          </div>
          <div className="col-span-3">{children} </div>
          
        </div>
      </div>
    </body>
  </html>
  )
} 
 
*/

//<div className="col-span-1"></div>

/*
const getUser = async (formData) => {
    'use server'
    const emailUser = formData.get("email");
    const passwordUser = formData.get("password")
    validateUser(emailUser, passwordUser)
  };


  const Auth = false
  if (Auth===true)return userAuth(children)
  if (Auth===false)return register(children, getUser)
  */
