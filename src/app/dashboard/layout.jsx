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
          <div className=" bg-slate-350">

            <div className="grid grid-rows-1">
              <Header />
            </div>

            <div className="container-per">
              <div className="column">
                {" "}
                <NavPrincipal />{" "}
              </div>
              <div className="column">{children} </div>
              <div className="column" >
                <h1>espacio vacio</h1>
            </div>
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
