"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavPrincipal({ role }) {
  console.log({ role });
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

        {(role === "master" || role==="invoicer" || role==="seller") && (
          <li
            className={
              pathname === "/dashboard/form/pedido"
                ? "text-color-green"
                : "linkPer"
            }
          >
            <Link href="/dashboard/form/pedido">Crear Pedido</Link>
          </li>
        )}

        {(role === "master" || role==="approver") && (
          <li
            className={
              pathname === "/dashboard/form/cliente"
                ? "text-color-green"
                : "linkPer"
            }
          >
            <Link href="/dashboard/form/cliente">Crear Cliente</Link>
          </li>
        )}

        {(role === "master" || role === "invoicer" || role==="approver") && (
          <li
            className={
              pathname === "/dashboard/form/articulo"
                ? "text-color-green"
                : "linkPer"
            }
          >
            <Link href="/dashboard/form/articulo">Crear Artículo</Link>
          </li>
        )}

        <li
          className={
            pathname === "/dashboard/products" ? "text-color-green" : "linkPer"
          }
        >
          <Link href="/dashboard/products">Productos</Link>
        </li>

        {(role === "master" || role === "seller") && (
          <li
            className={
              pathname === "/dashboard/history" ? "text-color-green" : "linkPer"
            }
          >
            <Link href="/dashboard/history">Historial Pedidos</Link>
          </li>
        )}

        {(role === "master" || role === "seller"|| role==="picker") && (
          <li
            className={
              pathname === "/dashboard/form/editpedido" ? "text-color-green" : "linkPer"
            }
          >
            <Link href="/dashboard/form/editpedido">Editar pedido</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

/*
{role === "master" && (
          <li
            className={
              pathname === "/dashboard/tools/history"
                ? "text-color-green"
                : "linkPer"
            }
          >
            <Link href="/dashboard/tools/history">Global de Pedidos</Link>
          </li>
        )}
          */
