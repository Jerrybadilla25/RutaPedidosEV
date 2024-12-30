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
  const ancla2 = data?.ancla || [];


  // Decodificar y procesar `ancla`
  let ancla = [];
  if (data?.ancla) {
    try {
      ancla = JSON.parse(decodeURIComponent(data.ancla));
    } catch (error) {
      console.error("Error al procesar ancla:", error);
    }
  }
  const valorAncla1 = ancla?.[0] || null;
  const valorAncla2 = ancla?.[1] || null;
  const valorAncla3 = ancla?.[2] || null;
 



  let pedidos1; // Declara pedidos fuera del bloque if/else

  if (filter === "vacio") {
    pedidos1 = await getDataPedidos();
  } else {
    pedidos1 = await getDataPedidosFilter(filter);
  }

  
  const elementosPrincipales = pedidos1
  .filter((item) => ancla2.includes(item._id))
  .sort((a, b) => (a.posicion) - (b.posicion));
  const elementosRestantes = pedidos1.filter(
    (item) => !ancla2.includes(item._id)
  );
  const pedidos = [...elementosPrincipales, ...elementosRestantes];
  let numberAle = 0
  
  

  return (
    <Suspense fallback={<p>Cargando pedidos...</p>}>
      <Filtros filtro={filter} numberAle={numberAle} />
      {pedidos.map((pedido) => (
        <TablaPedido
          key={pedido._id}
          data={pedido}
          valorAncla1={valorAncla1}
          valorAncla2={valorAncla2}
          valorAncla3={valorAncla3}
        />
      ))}
    </Suspense>
  );
}
