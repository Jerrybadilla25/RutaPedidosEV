"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavPrincipal() {
  const pathname = usePathname();
  return (
    <nav className="navPer">
      <ul>
        <li className={`${pathname === "/" ? "text-color-green" : "linkPer"}`}>
        <Link href="/">Home</Link>
        </li>

        <li className="linkPer">
        <Link href="#">Dashboard</Link>
        </li>

        <li
          className={`${
            pathname === "/form/pedido" ? "text-color-green" : "linkPer"
          }`}
        >
           <Link href="/form/pedido">Crear Pedido</Link>
        </li>
        <li className="linkPer">
        <Link href="#">Crear Cliente</Link>
        </li>
        <li className="linkPer">
        <Link href="#">Crear Artículo</Link>
        </li>
      </ul>
    </nav>
  );
}

