import localFont from "next/font/local";
import "./local.css";
import NavPrincipal from "@/app/dashboard/navprincipal";
import NavSecundario from "@/app/dashboard/navsecundario";
import Header from "@/components/header";
import { getUser } from "@/utils/dal";



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

export default async function DasboardLayout({ children }) {
  //validar la sescion
  const dataUser = await getUser();

  if (dataUser._id) {
    return (
      <>
        <div>
          <div className="container-100">
            <div>
              <Header role={dataUser.role} />
            </div>
            <div className="row-1">
              <NavSecundario role={dataUser.role} />{" "}
            </div>

            <div className="row">
              <div className="colunma">
                <div className="colunm-1">
                  <NavPrincipal role={dataUser.role} />
                </div>
                <div className="colunm-2">{children} </div>
                <div className="colunm-1">
                  <h1></h1>
                </div>
                
              </div>
            </div>
          </div>
          
        </div>
      </>
    );
  }

  return <div>No tiene permiso</div>;
}
