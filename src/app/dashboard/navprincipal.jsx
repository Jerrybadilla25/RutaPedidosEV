"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import BotonLogOut from "@/components/botonLogOut";

export default function NavPrincipal() {
  const pathname = usePathname();
  return (
    <nav className="navPer">
      <ul>
        <li className={pathname === "/" ? "text-color-green" : "linkPer"}>
          <Link href="/">Home</Link>
        </li>

        <li
          className={pathname === "/dashboard" ? "text-color-green" : "linkPer"}
        >
          <Link href="/dashboard">Dashboard</Link>
        </li>

        <li
          className={
            pathname === "/dashboard/form/pedido"
              ? "text-color-green"
              : "linkPer"
          }
        >
          <Link href="/dashboard/form/pedido">Crear Pedido</Link>
        </li>
        <li
          className={
            pathname === "/dashboard/form/cliente"
              ? "text-color-green"
              : "linkPer"
          }
        >
          <Link href="/dashboard/form/cliente">Crear Cliente</Link>
        </li>
        <li
          className={
            pathname === "/dashboard/form/articulo"
              ? "text-color-green"
              : "linkPer"
          }
        >
          <Link href="/dashboard/form/articulo">Crear Artículo</Link>
        </li>
        <li
          className={
            pathname === "/dashboard/products" ? "text-color-green" : "linkPer"
          }
        >
          <Link href="/dashboard/products">Productos</Link>
        </li>
        <li
          className={
            pathname === "/dashboard/tools/history" ? "text-color-green" : "linkPer"
          }
        >
          <Link href="/dashboard/tools/history">Historial</Link>
        </li>
        <li className="linkPer">
          <BotonLogOut />
        </li>
      </ul>
    </nav>
  );
}
