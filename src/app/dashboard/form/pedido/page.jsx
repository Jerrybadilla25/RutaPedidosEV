export const dynamic = 'force-dynamic';
import TablaCliente from "@/app/dashboard/form/pedido/tableCliente";
import TableAddPedido from "@/app/dashboard/form/pedido/tableAddPedido";
import Cargando from "@/components/cargando";
import Search from "@/app/dashboard/form/pedido/search";
import { Suspense } from "react";
import Cliente from "@/model/Cliente";
import Productos from "@/model/Product";
import "./local.css";

export default async function FormPedidoCliente({ searchParams }) {
  const data = await searchParams;
  const query = data?.query || "";
  const seachid = data?.searchid || ""; //existe un search id cliente
  if (seachid) {
    //const clientId1 = await Cliente.findById(seachid).lean()
    //const clientId = JSON.parse(JSON.stringify(clientId1))
    const clientId = JSON.parse(
      JSON.stringify(await Cliente.findById(seachid).limit(5).lean())
    ); //esta linea de codigo unifica las dos de arriba, se necesita documentos no serializados para pasar como props al cliente
    //const products1 = await Productos.find().lean()
    const products = JSON.parse(JSON.stringify(await Productos.find().lean
    ()));
    

    return (
      <div className="">
        <Search />
        <div>
          <Suspense key={seachid}>
            <TableAddPedido clientId={clientId} products={products} />
          </Suspense>
        </div>
      </div>
    );
  }

  return (
    <div className="">
      <Search />
      {/* Contenedor de la tarjeta */}
      <div>
        <Suspense key={query} fallback={<Cargando />}>
          <TablaCliente query={query} />
        </Suspense>
      </div>
    </div>
  );
}
