// Importaciones necesarias para la página
export const dynamic = 'force-dynamic';
import React from "react";
import { Suspense } from "react";
import { connectDB } from "@/utils/dbserver"; // Función para conectar a la base de datos
import TablaPedido from "@/app/dashboard/tablePedido"; // Componente para mostrar los pedidos en una tabla
import SqueletonTable from "@/app/dashboard/squeletonTable"; // Componente de carga mientras se obtienen los datos
import Filtros from "@/app/dashboard/fitros"; // Componente para los filtros de la página
import { getDataPedidos, getDataPedidosFilter } from "@/app/dashboard/action"; // Funciones para obtener los datos de pedidos
import {getUser} from '@/utils/dal'

// Componente principal de la página
export default async function Homepage({ searchParams }) {
  // Conexión inicial a la base de datos
  connectDB();

  // Obtiene los parámetros de búsqueda enviados en la URL
  const data = await searchParams;

  // Obtiene el rango de fechas para filtrar los pedidos
  const datafilterRango = data?.filterRango || null;
  let filterRango;

  if (data?.filterRango) {
    // Si existe un rango de fechas, intenta decodificarlo desde la URL
    try {
      const fechas = JSON.parse(decodeURIComponent(datafilterRango));
      
      const fechaIn = new Date(fechas.dataIn)
      fechaIn.setHours(0, 0, 0, 0)
      const fechaOut = new Date(fechas.dataOut)
      fechaOut.setHours(23, 59, 59, 999)
      filterRango = {
        dataIn: fechaIn,
        dataOut: fechaOut,
      };
    } catch (error) {
      console.error("Error al decodificar filterRango:", error);
    }
  } else {
    // Si no hay rango de fechas, se genera un rango predeterminado de los últimos 10 días
    const today = new Date();
    const dataOut = new Date(today); // Fecha de hoy con hora completa
    dataOut.setHours(23, 59, 59, 999); // Final del día (23:59:59.999)

    const pastDate = new Date(today);
    pastDate.setDate(today.getDate() - 10); // Fecha 10 días antes
    pastDate.setHours(0, 0, 0, 0); // Inicio del día (00:00:00.000)

    filterRango = {
      dataIn: pastDate,
      dataOut: dataOut,
    };
  }

  // Obtiene el filtro adicional desde los parámetros de búsqueda (o "vacio" si no existe)
  const filter = data?.filter || "vacio";

  // Procesa el parámetro "ancla", que indica elementos destacados
  const ancla2 = data?.ancla || [];
  let ancla = [];

  if (data?.ancla) {
    try {
      const data2 = JSON.parse(decodeURIComponent(data.ancla)); // Decodifica y parsea el parámetro "ancla"
      if (Array.isArray(data2) && data2.length >= 2) {
        ancla = data2.sort((a, b) => a.posicion - b.posicion); // Ordena los elementos por posición
      } else {
        ancla = data2;
      }
    } catch (error) {
      console.error("Error al procesar 'ancla':", error);
    }
  }

  // Extrae solo los IDs de los elementos destacados
  const idsAncla = ancla.map((a) => a.id);

  // Obtiene los valores individuales de "ancla" para usarlos posteriormente
  const valorAncla1 = ancla?.[0] || null;
  const valorAncla2 = ancla?.[1] || null;
  const valorAncla3 = ancla?.[2] || null;

  let pedidos1; // Variable para almacenar los pedidos obtenidos

  const session = await getUser()
  


  try {
    if (filter === "vacio") {
      pedidos1 = await getDataPedidos(filterRango);
    } else {
      pedidos1 = await getDataPedidosFilter(filter, filterRango);
    }
  } catch (error) {
    console.error("Error al obtener los pedidos:", error);
    pedidos1 = []; // Retorna una lista vacía en caso de error
  }
  

  // Separa los pedidos destacados (según "ancla") del resto
  const elementosPrincipales = pedidos1
    .filter((item) => idsAncla.includes(item._id)) // Filtra los pedidos destacados
    .sort((a, b) => {
      // Ordena los destacados según su posición en "ancla"
      const posicionA = ancla.find((x) => x.id === a._id)?.posicion || 0;
      const posicionB = ancla.find((x) => x.id === b._id)?.posicion || 0;
      return posicionA - posicionB;
    });

  // Filtra los pedidos que no están en "ancla"
  const elementosRestantes = pedidos1.filter(
    (item) => !idsAncla.includes(item._id)
  );

  // Combina los pedidos destacados y los restantes
  const pedidos = [...elementosPrincipales, ...elementosRestantes];

  return (
    // Suspense muestra un componente de carga mientras se obtienen los datos
    <Suspense fallback={<SqueletonTable />}>
      {/* Componente de filtros con información del filtro y número de anclas */}
      <Filtros filtro={filter} numberAncla={ancla.length} />

      {/* Renderiza cada pedido como un componente TablaPedido */}
      {pedidos.map((pedido) => (
        <TablaPedido
          key={pedido._id} // Llave única para cada componente
          data={pedido} // Datos del pedido
          valorAncla1={valorAncla1} // Primer valor destacado (ancla)
          valorAncla2={valorAncla2} // Segundo valor destacado (ancla)
          valorAncla3={valorAncla3} // Tercer valor destacado (ancla)
        />
      ))}
    </Suspense>
  );
}
