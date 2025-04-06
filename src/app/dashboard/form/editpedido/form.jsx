"use client";
import React, { useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import Tr from "@/app/dashboard/form/editpedido/tr";
import TrAdd from "@/app/dashboard/form/editpedido/trAdd";

export default function FormeditPedido({ pedido, products }) {
  const [addItem, setAddItem]= useState(false)

  const addCampoNuevo=()=>{
    setAddItem(!addItem)
  }
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

        <table>
          <thead>
            <tr>
              <th>Codigo</th>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Total</th>
              <th></th>
              <td>
                <IoMdAddCircleOutline onClick={addCampoNuevo} />
              </td>
            </tr>
          </thead>
          <tbody >
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
            {
              addItem===true && <TrAdd products={products}/>
            }
            
          </tbody>
        </table>
      </div>
    </div>
  );
}
