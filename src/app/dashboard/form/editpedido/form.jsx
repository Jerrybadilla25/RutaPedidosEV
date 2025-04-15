"use client";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import Tr from "@/app/dashboard/form/editpedido/tr";
import TrAdd from "@/app/dashboard/form/editpedido/trAdd";

export default function FormeditPedido({ pedido, products, usuario }) {
  const [addItem, setAddItem] = useState(false);

  const addCampoNuevo = () => {
    setAddItem(!addItem);
  };
  return (
    <div className="container-90">
      <div className="flex-column table-container ">
        <div className="mb-1">
          <p className="">
            <strong>Cliente: {pedido.idCliente}</strong>
          </p>
          <p className="">
            <strong>Nombre: {pedido.name}</strong>
          </p>
        </div>
        {addItem === true && (
          <table className="full-width-table">
            <thead>
             <tr>
             <th colSpan="2" className="text-warning">Agregar articulo</th>
              <th className="text-warning">Cantidad</th>
              <th></th>
              <th className="text-warning">Aplicar</th>
             </tr>
            </thead>
            <tbody>
              <TrAdd products={products} setAddItem={setAddItem}  />
            </tbody>
          </table>
        )}
        <div>
          <p>
            <strong className="nameTitle mx-1">Editar</strong>
          </p>
        </div>
        <table className="full-width-table">
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
              <td>
                <IoMdAddCircleOutline 
                color="#f57b27"
                size="2em" 
                onClick={addCampoNuevo}
                 />
              </td>
            </tr>
          </thead>
          <tbody>
            {pedido.productos.map((itm, index) => (
              <Tr
                key={index}
                sku={itm.sku}
                price={itm.price}
                cantidad={itm.cantidad}
                nombre={itm.nombre}
                id={itm._id}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
