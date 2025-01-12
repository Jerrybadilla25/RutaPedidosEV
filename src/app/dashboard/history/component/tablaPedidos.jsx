import React from "react";
import { unificarClientes } from "@/app/dashboard/history/action";

export default async function TablaPedidos({ dataHistory }) {
  const datos = await unificarClientes(dataHistory);

  return (
    <div className="box-history-container">
      <h1 className="roboto text-warning">Historial de Productos</h1>
      {datos.map((itm) => (
        <div key={itm._id}>
          <div className="box-history">
            <div className="flex-row justify-between gap-medium ">
              <p className="flex-column">
                <strong className="nameTitle font-sm">Id Cliente </strong>
                <strong>{itm.idCliente}</strong>
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
                  {itm.shippingAddress.provincia}, {itm.shippingAddress.canton},{" "}
                  {itm.shippingAddress.distrito}{" "}
                </strong>
              </p>
            </div>
          </div>
        </div>
      ))}

      {datos.length === 1 ? (
        <div className="flex-column my-1">
        

          <div className="flex-row justify-around box-row-venta">
            <strong className="bold roboto">Ventas totales</strong>
            <strong className="text-succes roboto">
              {datos[0].productos
                .reduce(
                  (acc, itenes) => acc + itenes.price * itenes.cantidad,
                  0
                )
                .toLocaleString("es-ES", {
                  style: "currency",
                  currency: "CRC",
                })}
            </strong>
          </div>

          <table className="table-full">
            <thead>
              <tr>
                <th></th>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {datos[0].productos.map((producto, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{producto.sku}</td>
                  <td>{producto.nombre}</td>
                  <td>{producto.cantidad}</td>

                  <td className="text-warning">
                    {(producto.price * producto.cantidad).toLocaleString(
                      "es-ES",
                      {
                        style: "currency",
                        currency: "CRC",
                      }
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
}

/*

const data = [
    {
      cel: "252525",
      contact: "Pablo Ramirez",
      email: "pablo@gmail.com",
      idCliente: 451014,
      name: "Vivero San Pablo",
      productos: [
        {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
        {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
      ]
    },
    {
        cel: "252525",
        contact: "Pablo Ramirez",
        email: "pablo@gmail.com",
        idCliente: 451014,
        name: "Vivero San Pablo",
        productos: [
          {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
          {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
        ]
      },
      {
        cel: "252527",
        contact: "jerry badilla",
        email: "jerry@gmail.com",
        idCliente: 451015,
        name: "Vivero San juan",
        productos: [
          {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
          {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
        ]
      },
  ];
  */
