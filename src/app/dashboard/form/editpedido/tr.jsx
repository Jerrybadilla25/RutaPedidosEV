"use client";
import React, { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

export default function Tr({ sku, nombre, price, cantidad, id, products }) {
  // Asegúrate de que cantidad nunca sea undefined/null
  const [newCantidad, setNewCantidad] = useState(cantidad);
  const [hasChanged, setHasChanged] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  
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

  //escucha cuando cambia la cantidad
  const handleNewCantidad = (e) => {
    const value = e.target.value;
    if (value === 0) {
      console.log({value})
      setNewCantidad("");
      //setHasChanged(value !== cantidad);
    } else {
      console.log({value})
      setNewCantidad(value);
      setHasChanged(value !== cantidad);
    }
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
          value={newCantidad === 0 ? "" : newCantidad} // Muestra vacío si es 0
          onChange={handleNewCantidad}
          min="1" // Impide números menores a 1 mediante las flechas/spinner
        />
      </td>
      <td>
        {(price * newCantidad).toLocaleString("es-ES", {
          style: "currency",
          currency: "CRC",
        })}
      </td>
      <td>
        <MdDeleteForever 
        color="#8f2e27"
        size="2em" 
        onClick={deleteItem} 
        style={{ cursor: "pointer" }} />
      </td>
      <td className={hasChanged ? "" : "editColor-green"}>
        {hasChanged && (
          <FaRegCheckCircle
            color="#4caf50"
            size="2em"
            onClick={handleSendParams}
            style={{ cursor: "pointer" }}
          />
        )}
      </td>
    </tr>
  );
}
