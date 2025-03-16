import React from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";

export default function FormeditPedido({ pedido }) {
  return (
    <div className="container-90">
      <div className="flex-column">
        <div className="">
          <p className="">
            <strong>Cliente: {pedido.idCliente}</strong>
          </p>
          <p className="">
            <strong>Nombre: {pedido.name}</strong>
          </p>
        </div>

        <table className="">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
              <td><IoMdAddCircleOutline /></td>
              
            </tr>
          </thead>
          <tbody>
            {pedido.productos.map((itm, index) => (
              <tr key={index}>
                <td>{itm.sku}</td>
                <td>{itm.nombre}</td>
                <td>{itm.cantidad}</td>
                <td>
                  {(itm.price * itm.cantidad).toLocaleString("es-ES", {
                    style: "currency",
                    currency: "CRC",
                  })}
                </td>
                <td><MdDeleteForever/></td>
                <td><FaRegCheckCircle /></td>
                
                
              </tr>
            ))}
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><MdDeleteForever/></td>
            <td><FaRegCheckCircle /></td>
          </tbody>
        </table>
      </div>
    </div>
  );
}
