import Link from "next/link";
import { cookies } from "next/headers";
import { GrLogin, GrLogout } from "react-icons/gr";

export default async function Homepage() {
  const cookie = (await cookies()).get("session")?.value;

  return (
    <div className="container-100">
      <header className="container-100 flex-row justify-between altura-header">
        <div className="logo-principal">
          {cookie ? (
            <Link href="/dashboard" className="hover:text-gray-300">
              Mi Aplicacion
            </Link>
          ) : (
            <div>Logo</div>
          )}
        </div>

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
      </header>
      <div></div>
    </div>
  );
}
