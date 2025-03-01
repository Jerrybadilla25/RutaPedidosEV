"use client";
import { useActionState, useState, useEffect, use } from "react";
import { addPedidotBd } from "@/app/dashboard/form/pedido/actions";

export default function Table2({ products, id, desc }) {
  const [state, formAction, pending] = useActionState(addPedidotBd, undefined);
  const [data, setData] = useState([]); // Estado inicial vacío
  const [filter, setFilter] = useState("Sustratos");
  

  useEffect(() => {
    if (products?.length) {
      const updatedData = products.map((producto) => ({
        ...producto,
        cantidad: 0, // Campo cantidad por defecto
        subtotal: 0, // Campo subtotal por defecto
      }));
      setData(updatedData);
    }
  }, [products, filter]); // Dependencia en `products`

  

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

  const changeCategory = (fil) => {
    setFilter(fil);
  };

  return (
    <div>
      <div className="flex-row justify-around">
        <h2 className="nameDescripcion mb-1 w-25">Tomar pedido</h2>
        <div className="flex-column w-25">
          {desc !== 0 && (
            <p>
              <strong className="nameDescripcion">Total:</strong>{" "}
              {data
                .reduce((acc, item) => acc + item.subtotal, 0)
                .toLocaleString("es-ES", {
                  style: "currency",
                  currency: "CRC",
                })}
            </p>
          )}
          {desc !== 0 && (
            <p>
              <strong>Descuento: </strong>
              {(
                (data.reduce((acc, item) => acc + item.subtotal, 0) * desc) /
                100
              ).toLocaleString("es-ES", {
                style: "currency",
                currency: "CRC",
              })}
            </p>
          )}
          <p
            className={
              data.reduce((acc, item) => acc + item.subtotal, 0) >= 78950
                ? "nameDescripcion mb-1 box-green"
                : "nameDescripcion mb-1 box-red"
            }
          >
            <strong>{desc === 0 ? "Total" : "Total con descuento"} </strong>
            {(
              data.reduce((acc, item) => acc + item.subtotal, 0) *
              (1 - desc / 100)
            ).toLocaleString("es-ES", {
              style: "currency",
              currency: "CRC",
            })}
          </p>
        </div>
      </div>

      <form action={formAction} className="flex-row w-100">
        <table className="table-per">
          <colgroup>
            <col style={{ width: "5%" }} />
            <col style={{ width: "45%" }} />

            <col style={{ width: "15%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "10%" }} />
            <col style={{ width: "15%" }} />
          </colgroup>
          <thead>
            <tr className="table-header">
              <th>Código</th>
              <th>Nombre</th>

              <th>Precio</th>
              <th>Invent</th>
              <th>Solicitud</th>
              <th>Sub total</th>
            </tr>
          </thead>
          <tbody>
            {data
              .filter((itm) => itm.category !== filter) // Filtrar antes de ordenar
              .sort((a, b) => a.name.localeCompare(b.name)) // Ordenar por name A-Z
              .map((itm) => (
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
                      value={itm.price}
                      name="price"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="input-per"
                      name="inventario"
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
                    <p>{itm.subtotal.toLocaleString("es-ES")}</p>
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

/*

<div className="flex-row justify-flex-start  gap-medium mx-1 my-1">
          <p className="nameDescripcion btn-filter-fijo">Filtros</p>
          <p
            onClick={() => changeCategory("Sustratos")}
            className={filter==='Sustratos' ? "btn-filter-hover": 'nameTitle btn-filter'}
          >
            Sustratos
          </p>
          <p
            onClick={() => changeCategory("Fertilizantes")}
            className={filter==='Fertilizantes' ? "btn-filter-hover": 'nameTitle btn-filter'}
          >
            Fertilizante
          </p>
          <p
            onClick={() => changeCategory("Fungicida")}
            className={filter==='Fungicida' ? "btn-filter-hover": 'nameTitle btn-filter'}
          >
            Fungicidas
          </p>
          <p
            onClick={() => changeCategory("Insecticida")}
            className={filter==='Insecticida' ? "btn-filter-hover": 'nameTitle btn-filter'}
          >
            Insecticidas
          </p>
          <p
            onClick={() => changeCategory("Varios")}
            className={filter==='Varios' ? "btn-filter-hover": 'nameTitle btn-filter'}
          >
            Varios
          </p>
        </div>
        */
