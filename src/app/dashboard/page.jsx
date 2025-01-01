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
  let ancla = [];

  if (data?.ancla) {
    try {
      const data2 = JSON.parse(decodeURIComponent(data.ancla));
      if (Array.isArray(data2) && data2.length >= 2) {
        ancla = data2.sort((a, b) => a.posicion - b.posicion);
      } else {
        ancla = data2;
      }
    } catch (error) {
      console.error("Error al procesar 'ancla':", error);
    }
  }

  const idsAncla = ancla.map((a) => a.id); // Extrae solo IDs de 'ancla'

  const valorAncla1 = ancla?.[0] || null;
  const valorAncla2 = ancla?.[1] || null;
  const valorAncla3 = ancla?.[2] || null;

  let pedidos1;

  if (filter === "vacio") {
    pedidos1 = await getDataPedidos();
  } else {
    pedidos1 = await getDataPedidosFilter(filter);
  }

  const elementosPrincipales = pedidos1
    .filter((item) => idsAncla.includes(item._id))
    .sort((a, b) => {
      const posicionA = ancla.find((x) => x.id === a._id)?.posicion || 0;
      const posicionB = ancla.find((x) => x.id === b._id)?.posicion || 0;
      return posicionA - posicionB;
    });

  const elementosRestantes = pedidos1.filter((item) => !idsAncla.includes(item._id));
  const pedidos = [...elementosPrincipales, ...elementosRestantes];

  return (
    <Suspense fallback={<p>Cargando pedidos...</p>}>
      <Filtros filtro={filter} numberAncla={ancla.length}/>
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

