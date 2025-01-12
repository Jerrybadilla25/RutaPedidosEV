"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavPrincipal({ role }) {
  const pathname = usePathname();
  return (
    <nav className="navSecundario">
      <ul>
        <li className={pathname === "/" ? "linkPer3" : "linkPer2"}>
          <Link href="/">Home</Link>
        </li>

        <li className={pathname === "/dashboard" ? "linkPer3" : "linkPer2"}>
          <Link href="/dashboard">Dashboard</Link>
        </li>

        {role !== "user" && (
          <li
            className={
              pathname === "/dashboard/form/pedido" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/pedido">Crear Pedido</Link>
          </li>
        )}

        {role !== "user" && (
          <li
            className={
              pathname === "/dashboard/form/cliente" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/cliente">Crear Cliente</Link>
          </li>
        )}

        {(role === "master" || role === "facturacion") && (
          <li
            className={
              pathname === "/dashboard/form/articulo" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/articulo">Crear Artículo</Link>
          </li>
        )}

        <li
          className={
            pathname === "/dashboard/products" ? "linkPer3" : "linkPer2"
          }
        >
          <Link href="/dashboard/products">Productos</Link>
        </li>

        {(role === "master" || role === "ventas") && (
          <li
            className={
              pathname === "/dashboard/history" ? "linPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/history">Historial Pedidos</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

/*
 <li className="linkPer2">
          <Link href="/dashboard/tools/history">Historial Cliente</Link>
        </li>
        */
