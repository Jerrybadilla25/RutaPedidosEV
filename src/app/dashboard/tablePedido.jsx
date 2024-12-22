"use client";
import React from "react";
import { useState } from "react";

export default function TablePedido({ pedido }) {
  const [dNone, setdNone]=useState("pedido-oculto")
  const [status, setStatus]=useState(pedido.status)
  function displayNone() {
    if(dNone==="pedido-oculto"){
      setdNone('')
    }else{
      setdNone('pedido-oculto')
    }
    
  }

  const handleChange = (event) => {
    setStatus(event.target.value);
  };


  return (
    <div className="pedido">
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
              <select className="pedido-select" name="" id="" onChange={handleChange}>
                <option value="pending">{pedido.status}</option>
                <option value="shipped">shipped</option>
                <option value="delivered">delivered</option>
                <option value="cancelled">cancelled</option>
               
              </select>
              </strong>
          </p>
        </div>
        {
          status !== 'pending' ? (
            <div className="pedido-sub">
              <p>Guardar</p>
              <button>Aplicar cambios</button>
            </div>
          ) : null
        }
      </div>
      <div className="pedido-col">
        <p className="font-sx">
          <strong>Dirección de Envío:</strong>{" "}
          {`${pedido.shippingAddress.direccion}, ${pedido.shippingAddress.distrito}, ${pedido.shippingAddress.canton}, ${pedido.shippingAddress.provincia}`}
        </p>
      </div>
      <div className="pedido-col" >
            <p >
              <button 
              onClick={()=>displayNone()}
              className="font-sl pedido-button" >
                {
                  dNone==='pedido-oculto'? 'Ver detalle...':'Ocultar detalle'
                }
              </button>
            </p>
      </div>
      <div className={`${dNone} pedido-col pedido-box-list`}>
        <p>
          <strong>Productos:</strong>
        </p>
        <ul className="pedido-ul ">
          {pedido.productos.map((producto, index) => (
            <li key={index}>
              {producto.sku}  {producto.nombre} (x{producto.cantidad}) -{" "}
              {producto.price.toLocaleString("es-ES", {
                style: "currency",
                currency: "CRC",
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/*
<p>
        <strong>Total:</strong>{" "}
        {pedido.totalAmount.toLocaleString("es-ES", {
          style: "currency",
          currency: "CRC",
        })}
      </p>
      */
