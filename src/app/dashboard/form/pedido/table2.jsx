"use client";
import { useActionState, useState, useEffect } from "react";
import { addPedidotBd } from "@/app/dashboard/form/pedido/actions";



export default function Table2({ products, id }) {
  const [state, formAction, pending] = useActionState(addPedidotBd, undefined);
  const [data, setData] = useState([]); // Estado inicial vacío

  

  useEffect(() => {
    if (products?.length) {
      const updatedData = products.map((producto) => ({
        ...producto,
        cantidad: 0, // Campo cantidad por defecto
        subtotal: 0, // Campo subtotal por defecto
      }));
      setData(updatedData);
    }
  }, [products]); // Dependencia en `products`

  const handleChange = (_id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === _id
          ? {
              ...item,
              cantidad: value,
              subtotal: value * item.price,
            }
          : item
      )
    );
  };

  return (
    <div>
      <div className="flex-row justify-around">
        <h2 className="nameDescripcion mb-1 w-25">Tomar pedido</h2>
        <div className="flex-row w-25">
          <p
            className={
              data.reduce((acc, item) => acc + item.subtotal, 0) >= 70000
                ? "nameDescripcion mb-1 box-green"
                : "nameDescripcion mb-1 box-red"
            }
          >
            <strong className="nameDescripcion mx-1">Total:</strong>{" "}
            {data
              .reduce((acc, item) => acc + item.subtotal, 0)
              .toLocaleString("es-ES", {
                style: "currency",
                currency: "CRC",
              })}
          </p>
        </div>
      </div>

      <form action={formAction} className="flex-row w-100">
        <table className="table-per">
          <colgroup>
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "25%" }} />
            <col style={{ width: "20%" }} />
          </colgroup>
          <thead>
            <tr className="table-header">
              <th>Código</th>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Solicitud</th>
              <th>Sub total</th>
            </tr>
          </thead>
          <tbody>
            {data.map((itm) => (
              <tr key={itm._id} className="table-row">
                <td>
                  <input
                    type="text"
                    name="sku"
                    className="input-field"
                    value={itm.productId}
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-field"
                    value={itm.name}
                    name="nombre"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-field"
                    value={itm.category}
                    name="category"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="input-field"
                    value={itm.price}
                    name="price"
                    readOnly
                  />
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    className="input-per"
                    name="cantidad"
                    onChange={(e) =>
                      handleChange(itm._id, Number(e.target.value))
                    }
                  />
                </td>
                <td>
                  <p>
                    {itm.subtotal.toLocaleString("es-ES", {
                      style: "currency",
                      currency: "CRC",
                    })}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <input
          type="text"
          name="idCliente"
          defaultValue={id}
          className="display-none"
        />
        <button className="button-full">Guardar pedido</button>
      </form>
    </div>
  );
}
