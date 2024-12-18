import { getClientePedido } from "@/app/dashboard/form/pedido/actions";
import SelectClient from '@/app/dashboard/form/pedido/selectClient'


export default async function TableCliente({query}) {
  const clientes = await getClientePedido(query);

  return (
    <div>
      {clientes.map((itm) => (
        <div key={itm._id}>
          <div className="grid grid-cols-1  my-3 border-2 borderPerAll">
            <div className="borderPerLef">
              <div className="flex justify-between mx-5 py-4 text-per-azul text-per-white">
                <div className="">
                  <p className=" ">Nombre del comercio</p>
                  <span className="text-per-white bolt-per font-per-sl">
                    {itm.name}
                  </span>
                </div>
                <div className="">
                  <p className="">Contacto</p>
                  <span className="text-per-white bolt-per font-per-sl">
                    {itm.contact}
                  </span>
                </div>
                <div>
                  <p className="">Tel contacto</p>
                  <span className="text-per-white bolt-per font-per-sl">
                    {itm.cel}
                  </span>
                </div>
                <div>
                  <p className=" ">Email contacto</p>
                  <span className="text-per-white bolt-per font-per-sl">
                    {itm.email}
                  </span>
                </div>
              </div>

              <div className="">
                <div className="mx-5 border-t-2 border-slate-900"></div>

                <div className="flex justify-between mx-5 text-per-azul ">
                  <div>
                    <p className="  mt-2">Direccion del cliente</p>
                  </div>
                  <div className="text-per-white p-3">
                    <div>
                      <p>
                        <span className="text-per-white">
                          {itm.address.provincia}, {itm.address.canton},{" "}
                          {itm.address.distrito} <br />
                        </span>
                        <span className="text-per-white">
                          {itm.address.direccion}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <SelectClient ids={itm._id.toString()}/>
              
              
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
