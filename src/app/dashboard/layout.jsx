import localFont from "next/font/local";
import "../globals.css";
import NavPrincipal from "@/components/navprincipal";
import Header from "@/components/header";
import {getUser} from '@/utils/dal'


const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Panel general de tareas",
  description: "creacion, vista de procesos de pedidos",
};

export default async function  DasboardLayout({ children }) {
  //validar la sescion
  const dataUser = await getUser()
  if(dataUser._id){
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
    );
  }

 return (
  <div>No tiene permiso</div>
 )
  
}
