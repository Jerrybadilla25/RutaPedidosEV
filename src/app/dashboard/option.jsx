"use client";
import React from "react";

export default function Pption({ statusBol, rol, status, handleChange }) {
  return (
    <select
      className="pedido-select"
      name="status"
      id="status"
      onChange={handleChange}
    >
      <option value={status}>{status}</option>

        {
            (rol==='ventas'&& status==='pending')&&(
                <option value="cancelled">Cancelado</option>
            )
        }
        {
            (rol==='logistica' && status==='pending')&&(
                <option value="delivered">Facturar</option>
                
            )
        }
        {
            (rol==='facturacion' && status==='delivered')&&(
                <option value="shipped">Enviar</option>
                
            )
        }
        {
            (rol==='master')&&(
                <>
                <option value="pending">pendiente</option>
                <option value="delivered">Facturar</option>
                <option value="shipped">Enviar</option>
                <option value="cancelled">cancelled</option>
                </>
                
                
            )
        }


      
    </select>
  );
}
