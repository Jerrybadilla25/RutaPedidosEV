"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Tr({ sku, nombre, price, cantidad, id, products }) {
  // Asegúrate de que cantidad nunca sea undefined/null
  const [newCantidad, setNewCantidad] = useState(Number(cantidad) || 0);
  const [hasChanged, setHasChanged] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Efecto para sincronizar con cambios externos
  useEffect(() => {
    setNewCantidad(Number(cantidad) || 0);
    setHasChanged(false);
  }, [cantidad]);

  const handleSendParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("del");
    params.delete("cant");
    params.delete("dele");
    params.delete("qty"); //cantidad nuevo codigo
    params.delete("add"); //id producto nuevo

    if (id) params.set("del", id);
    if (newCantidad) params.set("cant", newCantidad);

    replace(`${pathname}?${params.toString()}`);
    setHasChanged(false);
  };

  const handleNewCantidad = (e) => {
    const value = Number(e.target.value) || 0;
    setNewCantidad(value);
    setHasChanged(value !== (Number(cantidad) || 0));
  };

  const deleteItem = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("del");
    params.delete("cant");
    params.delete("dele");
    params.delete("qty"); //cantidad nuevo codigo
    params.delete("add"); //id producto nuevo
    if (id) {
      params.set("del", id);
      params.set("dele", "yes");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <tr>
      <td>{sku}</td>
      <td>{nombre}</td>
      <td>
        <input
          className="input-per"
          type="number"
          value={newCantidad}
          onChange={handleNewCantidad}
          min="0" // Añadido para evitar números negativos
        />
      </td>
      <td>
        {(price * newCantidad).toLocaleString("es-ES", {
          style: "currency",
          currency: "CRC",
        })}
      </td>
      <td>
        <MdDeleteForever onClick={deleteItem} style={{ cursor: "pointer" }} />
      </td>
      <td className={hasChanged ? "editColor-orange" : "editColor-green"}>
        {hasChanged && (
          <FaRegCheckCircle 
            onClick={handleSendParams} 
            style={{ cursor: "pointer" }} 
          />
        )}
      </td>
    </tr>
  );
}
