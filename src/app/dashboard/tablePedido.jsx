"use client";
import React from "react";
import { useState } from "react";
import { useActionState } from "react";
import BarraProgreso from "@/app/dashboard/barraprogreso";
import { upDateStatus } from "@/app/dashboard/action";

export default function TablePedido({ pedido }) {
  const [state, formAction, pending] = useActionState(upDateStatus, undefined);

  const [dNone, setdNone] = useState("pedido-oculto");
  const [dNone2, setdNone2] = useState("pedido-oculto");
  const [status, setStatus] = useState(pedido.status);
  function displayNone() {
    if (dNone === "pedido-oculto") {
      setdNone("pedido-table-notas");
    } else {
      setdNone("pedido-oculto");
    }
  }
  function displayNone2() {
    if (dNone2 === "pedido-oculto") {
      setdNone2("");
    } else {
      setdNone2("pedido-oculto");
    }
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  };

  return (
    <div className="pedido">
      <form action={formAction}>
        <div className="pedido-col">
          <div className="pedido-sub">
            <p className="w-1 font-sl">Fecha:</p>
            <p className="w-1 font-sx">
              <strong>
                {new Date(pedido.createdAt).toLocaleDateString("es-ES", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "2-digit",
                })}
              </strong>
            </p>
          </div>
          <div className="pedido-sub">
            <p className="w-1 font-sl">ID Pedido:</p>
            <p className="w-1 font-sx">
              <strong>{pedido.orderId}</strong>
            </p>
          </div>
          <div className="pedido-sub">
            <p className="w-4 font-sl">Cliente:</p>
            <p className="w-4 font-sx">
              <strong>{pedido.name}</strong>
            </p>
          </div>
          <div className="pedido-sub">
            <p className="w-1 font-sl">Telefono:</p>
            <p className="w-1 font-sx">
              <strong>{pedido.cel}</strong>
            </p>
          </div>
          <div className="pedido-sub">
            <p className="w-2 font-sl">Total:</p>
            <p className="w-2 font-sx">
              <strong>
                {pedido.totalAmount.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "CRC",
                })}
              </strong>
            </p>
          </div>
          <div className="pedido-sub">
            <p className="w-3 font-sl">Status:</p>
            <p className="w-3 font-sx">
              <strong>
                <select
                  className="pedido-select"
                  name="status"
                  id="status"
                  onChange={handleChange}
                >
                  <option value="pending">{pedido.status}</option>
                  <option value="shipped">shipped</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
              </strong>
            </p>
          </div>
          <div className="pedido-sub ">
            <p className="w-1 font-sl button-nota">+ Add Nota</p>
            <p className="w-1 font-sx">
              <strong className="notas-center">
                {`${pedido.notas.length} notas`}
              </strong>
            </p>
          </div>
          <div className="pedido-sub pedido-oculto">
            <input name="_id" id="_id" defaultValue={pedido._id} type="text" />
          </div>
          {status !== "pending" ? (
            <div className="pedido-sub-button">
              <p className=""></p>
              <button className="pedido-botton bold">Aplicar cambios</button>
            </div>
          ) : null}
        </div>
        <div className="pedido-col">
          <p className="font-sx">
            <strong>Dirección de Envío:</strong>{" "}
            {`${pedido.shippingAddress.direccion}, ${pedido.shippingAddress.distrito}, ${pedido.shippingAddress.canton}, ${pedido.shippingAddress.provincia}`}
          </p>
        </div>
        <div className="pedido-col">
          <BarraProgreso
            startDate={pedido.createdAt}
            endDate={pedido.statusUpdateDate}
          />
        </div>
        <div className="pedido-col-1">
          <p>
            <strong
              onClick={() => displayNone()}
              className="font-sl pedido-button"
            >
              {dNone === "pedido-oculto" ? "Ver detalle..." : "...ocultar detalle"}
            </strong>
          </p>
          <p>
            <strong 
            onClick={() => displayNone2()}
            className="font-sl pedido-button">
              {dNone2 === "pedido-oculto" ? "Ver notas..." : "...ocultar notas"}
            </strong>
          </p>
        </div>

        

        <div className={`${dNone} `}>
          <p>
            <strong>Pedido:</strong>
          </p>
          <table>
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {
                pedido.productos.map((itm, index)=>(
                  <tr key={index}>
                <td>{itm.sku}</td>
                <td>{itm.nombre}</td>
                <td>{itm.cantidad}</td>
                <td>{(itm.price*itm.cantidad).toLocaleString("es-ES", {
                  style: "currency",
                  currency: "CRC",
                })}</td>
              </tr>
                ))
              }
             
            </tbody>
          </table>
        </div>
        <div className={`${dNone2} pedido-col pedido-box-list`}>
          <p>
            <strong>Notas:</strong>
          </p>
          <ul className="pedido-ul ">
            {pedido.notas.map((itm, index) => (
              <li key={index}>
                
              </li>
            ))}
          </ul>
        </div>
      </form>
      <p className="font-sm">Vendedor:  <strong>{}</strong>{pedido.vendedor} </p>
    </div>
  );
}
