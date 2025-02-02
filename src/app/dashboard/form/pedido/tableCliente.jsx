import { getClientePedido } from "@/app/dashboard/form/pedido/actions";
import SelectClient from "@/app/dashboard/form/pedido/selectClient";
import EditClient from '@/app/dashboard/form/pedido/editClient'

export default async function TableCliente({ query }) {
  const clientes = await getClientePedido(query);

  return (
    <div className="container-100">
      {clientes.map((itm) => (
        <div key={itm._id} className="container-cliente">
          <div className="">
            <div className="">
              <div className="flex-row justify-between mb-2">
                <div className="flex-column">
                  <p className="nameTitle ">Nombre del comercio</p>
                  <span className="nameDescripcion">{itm.name}</span>
                </div>
                <div className="flex-column">
                  <p className="nameTitle">Contacto</p>
                  <span className="nameDescripcion">{itm.contact}</span>
                </div>
                <div className="flex-column">
                  <p className="nameTitle" >Tel contacto</p>
                  <span className="nameDescripcion">{itm.cel}</span>
                </div>
                <div className=" flex-column">
                  <p className="nameTitle">Email contacto</p>
                  <span className="nameDescripcion">{itm.email}</span>
                </div>
              </div>

              <div className="flex-row justify-between box-line">
                <div>
                  <p className=" nameTitle ">Direccion del cliente</p>
                </div>

               
                <div>
                  <p>
                    <span className="">
                      {itm.address.provincia},  {itm.address.canton},   {itm.address.distrito} <br />
                    </span>
                    <span className="nameDescripcion">{itm.address.direccion}</span>
                  </p>
                </div>
              </div>
              <SelectClient ids={itm._id.toString()} />
              <EditClient ids={itm._id.toString()} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
