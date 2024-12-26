import React from "react";
import { Suspense } from "react";
//import Home from '@/components/home'
import { connectDB } from "@/utils/dbserver";
import TablaPedido from "@/app/dashboard/tablePedido";
import Filtros from "@/app/dashboard/fitros";
import { getDataPedidos, getDataPedidosFilter } from "@/app/dashboard/action";

export default async function Homepage({ searchParams }) {
  connectDB();
  const data = await searchParams;
  const filter = data?.filter || "vacio";
  let pedidos; // Declara pedidos fuera del bloque if/else
  
  if (filter === "vacio") {
    pedidos = await getDataPedidos();
  } else {
    pedidos = await getDataPedidosFilter(filter);
  }
  

  return (
    <Suspense fallback={<p>Cargando pedidos...</p>}>
      <Filtros filtro={filter} />
      {pedidos.map((pedido) => (
        <TablaPedido key={pedido._id} data={pedido} />
      ))}
    </Suspense>
  );
}
