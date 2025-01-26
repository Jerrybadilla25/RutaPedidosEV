import { getClientePedido } from "@/app/dashboard/form/pedido/actions";
import SelectClient from "@/app/dashboard/form/pedido/selectClient";

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
                      direccion <br />
                    </span>
                    <span className="nameDescripcion">direccion</span>
                  </p>
                </div>
              </div>
              <SelectClient ids={itm._id.toString()} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
/*

name
"vivero tarvaquita"
email
"fiona@tarvaquita.com"
contact
"Fiona"
cel
"25101535"


address
Object
provincia
"san jose"
canton
"aserri"
distrito
"tarvaca"
direccion
"100 mts sur de la antena"
*/

/*
import {getClientePedido} from '@/utils/fechData'

export default async function TablaCliente(query ) {
   const clientes = await getClientePedido()
   console.log(clientes)
  

  return (
    <div className=" bg-slate-700 shadow-lg rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Título de la Tarjeta
      </h2>
      <p className="text-white mb-4">
        Este es un ejemplo de contenido en una tarjeta. Puedes agregar más
        información aquí.
      </p>
      <ul className="list-disc list-inside text-gray-700 mb-4">
        <li>Elemento 1</li>
        <li>Elemento 2</li>
        <li>Elemento 3</li>
      </ul>
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
        Botón de Acción
      </button>
    </div>
  );
}
*/
