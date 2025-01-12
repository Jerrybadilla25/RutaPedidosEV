import Link from "next/link";
import { cookies } from "next/headers";
import { GrLogin, GrLogout } from "react-icons/gr";
import BotonLogOut from "@/components/botonLogOut";

export default async function Homepage() {
  const cookie = (await cookies()).get("session")?.value;

  return (
    
      <header className="flex-row justify-between align-center altura-header">
        <div className="logo-principal">
          {cookie ? (
            <Link href="/dashboard" className="hover:text-gray-300">
              Mi Aplicacion
            </Link>
          ) : (
            <div>Logo</div>
          )}
        </div>

        {!cookie ? (
          <nav className="nav-container">
            <Link href="/login" className="nav-item">
              <span>
                <GrLogin />
              </span>
              <p>Login</p>
            </Link>
            <Link href="/register" className="nav-item">
              <span>
                <GrLogout />
              </span>
              <p>Register</p>
            </Link>
          </nav>
        ) : (
          <div className="">
            <BotonLogOut />
          </div>
        )}
      </header>
     
  );
}
