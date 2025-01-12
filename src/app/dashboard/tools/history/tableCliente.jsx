import Pedidos from "@/app/dashboard/tools/history/itemPedidos";

export default async function TableClient({ user, dataHistory }) {
  return (
    <div className="box-history-container">
      <h1 className="roboto text-warning">Historial de Pedidos</h1>
      {dataHistory.map((itm) => (
        <div key={itm._id}>
          <div className="">
            <div className="flex-row justify-between gap-medium line-botton-w box-history">
              <p className="flex-column">
                <strong className="nameTitle font-sm">Id Cliente </strong>
                <strong>{itm.clientId}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Nombre </strong>
                <strong>{itm.name}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Contacto </strong>
                <strong>{itm.contact}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm"> Status </strong>
                <strong>{itm.status}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Direccion</strong>
                <strong>
                  {itm.address.provincia}, {itm.address.canton},{" "}
                  {itm.address.distrito}{" "}
                </strong>
              </p>
            </div>

            {
              dataHistory.length === 1 ? 
              <div className="flex-row justify-around box-row-venta">
              
                <strong className="bold roboto">Ventas totales</strong>
                <strong className="text-succes roboto">
                  {itm.items
                    .reduce((acc, itenes) => acc + itenes.totalAmount, 0)
                    .toLocaleString("es-ES", {
                      style: "currency",
                      currency: "CRC",
                    })}
                </strong>
              
            </div>:<p></p>
            }

            

            {
              dataHistory.length === 1 ?
              <div className="flex-column my-1">
              <table className="table-full">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Id Pedido</th>
                    <th>Fecha</th>
                    <th>Status</th>
                    <th>Vendedor</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {itm.items.map((pds, index) => (
                    <tr key={pds._id}>
                      <td>{index + 1}</td>
                      <td>{pds.orderId}</td>
                      <td>
                        {new Date(pds.createdAt).toLocaleDateString("es-ES", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </td>
                      <td>{pds.status}</td>
                      <td>{pds.vendedor}</td>
                      <td className="text-warning">
                        {pds.totalAmount.toLocaleString("es-ES", {
                          style: "currency",
                          currency: "CRC",
                        })}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>:<p></p>
            }
          </div>
        </div>
      ))}
    </div>
  );
}
