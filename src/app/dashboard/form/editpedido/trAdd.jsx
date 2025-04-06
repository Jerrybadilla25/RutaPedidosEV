"use client";
import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { MdDeleteForever } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa";

export default function TrAdd({ products }) {
  const [cantidad, setCantidad] = useState();
  const [idAdd, setIdAdd] = useState();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSendParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("del"); //numero de pedido
    params.delete("cant");
    params.delete("dele");
    params.delete("qty"); //cantidad nuevo codigo
    params.delete("add"); //id producto nuevo

    if (idAdd && cantidad) {
      params.set("qty", cantidad);
      params.set("add", idAdd);
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleNewCantidad = (e) => {
    const value = Number(e.target.value) || 0;
    console.log(value);
    setCantidad(value);
  };
  const handleNewId = (id) => {
    console.log(id);
    setIdAdd(id);
  };

  

  return (
    <tr >
      <td colSpan="2">
        <select
          className="select-per"
          onChange={(e) => handleNewId(e.target.value)}
        >
          {products.map((itm, index) => (
            <option key={index} value={itm._id} className="option-per">
              {itm.productId} {itm.name}
            </option>
          ))}
        </select>
      </td>

      <td>
        <input
          className="input-per"
          type="number"
          onChange={handleNewCantidad}
          min="0" // Añadido para evitar números negativos
        />
      </td>
      <td></td>
      <td colSpan="2">
        <FaRegCheckCircle
          onClick={handleSendParams}
          style={{ cursor: "pointer" }}
        />
      </td>
     
      
    </tr>
  );
}
