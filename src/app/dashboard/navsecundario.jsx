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

        {(role === "master" || role==="invoicer" || role==="seller") && (
          <li
            className={
              pathname === "/dashboard/form/pedido" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/pedido">Crear Pedido</Link>
          </li>
        )}

        {(role === "master" || role==="approver") && (
          <li
            className={
              pathname === "/dashboard/form/cliente" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/cliente">Crear Cliente</Link>
          </li>
        )}

        {(role === "master" || role === "invoicer" || role==="approver") && (
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

        {(role === "master" || role === "seller") && (
          <li
            className={
              pathname === "/dashboard/history" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/history">Historial</Link>
          </li>
        )}
        {(role === "master" || role === "seller" || role==="picker") && (
          <li
            className={
              pathname === "/dashboard/form/editpedido" ? "linkPer3" : "linkPer2"
            }
          >
            <Link href="/dashboard/form/editpedido">Editar</Link>
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
