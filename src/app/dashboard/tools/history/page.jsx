export const dynamic = 'force-dynamic';
import "./local.css";
import { Suspense } from "react";
import { getUser } from "@/utils/dal";
import TableClient from "@/app/dashboard/tools/history/tableCliente";
import TablaCodigos from "@/app/dashboard/tools/component/tablaCodigos";
import { getHistoryClient } from "@/app/dashboard/tools/history/action";
import Search from "@/app/dashboard/tools/history/searchClient";

export default async function Historial({ searchParams }) {
  const user = await getUser();
  const data = await searchParams;
  const history = data?.history || "";
  const radio = data?.radio || "pedido";

  let dataHistory = [];
  dataHistory = JSON.parse(JSON.stringify(await getHistoryClient(history)));

  /*
  let dataHistory = [];
  if (history !== "") {
    dataHistory = JSON.parse(JSON.stringify(await getHistoryClient(history)));
  }
*/
  return (
    <div>
      <Search />
      <Suspense key={history}>
        {radio === "pedido" ? (
          <TableClient user={user} dataHistory={dataHistory} />
        ) : (
          <TablaCodigos dataHistory={dataHistory} />
        )}
      </Suspense>
    </div>
  );
}
