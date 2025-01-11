"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BotonLogOut from "@/components/botonLogOut";

export default function NavPrincipal() {
  const pathname = usePathname();
  return (
    <nav className="navSecundario">
      <ul>
        <li className={`${pathname === "/" ? "text-color-green" : "linkPer2"}`}>
          <Link href="/">Home</Link>
        </li>

        <li className="linkPer2">
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li
          className={`${
            pathname === "/form/pedido" ? "text-color-green" : "linkPer2"
          }`}
        >
          <Link href="/dashboard/form/pedido">Crear Pedido</Link>
        </li>
        <li className="linkPer2">
          <Link href="/dashboard/form/cliente">Crear Cliente</Link>
        </li>
        <li className="linkPer2">
          <Link href="/dashboard/form/articulo">Crear Artículo</Link>
        </li>
        <li className="linkPer2">
          <Link href="/dashboard/products">Productos</Link>
        </li>
        <li className="linkPer2">
          <Link href="/dashboard/tools/history">Historial</Link>
        </li>
        <li className="linkPer2">
          <BotonLogOut />
        </li>
      </ul>
    </nav>
  );
}
