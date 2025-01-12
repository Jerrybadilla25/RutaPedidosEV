import "./local.css";
import { Suspense } from "react";
//import { getUser } from "@/utils/dal";
import {
  getDataPedidos,
  getDataPedidos2,
} from "@/app/dashboard/history/action";
import TablePedidos from "@/app/dashboard/history/component/tablaPedidos";
//import TablaCodigos from "@/app/dashboard/tools/component/tablaCodigos";
//import { getHistoryClient } from "@/app/dashboard/tools/history/action";
import Search from "@/app/dashboard/history/component/search";

export default async function Historial({ searchParams }) {
  //const user = await getUser();
  const data = await searchParams;
  const history = data?.history || "";
  //const radio = data?.radio || "pedido";
  const datafilterRango = data?.filterRango || null;

  let filterRango;

  if (datafilterRango) {
    try {
      const fechas = JSON.parse(decodeURIComponent(datafilterRango));
      const fechaIn = new Date(fechas.dataIn);
      fechaIn.setHours(0, 0, 0, 0);
      const fechaOut = new Date(fechas.dataOut);
      fechaOut.setHours(23, 59, 59, 999);
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

  let dataHistory = [];
  //dataHistory = JSON.parse(JSON.stringify(await getHistoryClient(history)));
  if (history === "") {
    dataHistory = await getDataPedidos(filterRango);
  } else {
    dataHistory = await getDataPedidos2(filterRango, history);
  }

  return (
    <div>
      <Suspense key={history}>
        <Search />
        <TablePedidos dataHistory={dataHistory} />
      </Suspense>
    </div>
  );
}
