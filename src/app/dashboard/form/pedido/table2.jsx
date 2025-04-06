"use client";
import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";


//import { addPedidotBd } from "@/app/dashboard/form/pedido/actions";

export default function Table2({ products, id, desc }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [data, setData] = useState([]); // Estado inicial vacío
  const [filter, setFilter] = useState("Sustratos");
  const [sessionInfo, setSessionInfo] = useState(null);
  
  

  useEffect(() => {
    if (products?.length) {
      const updatedData = products.map((producto) => ({
        ...producto,
        cantidad: producto.cantidad || 0, // Mantener valores previos
        subtotal: producto.subtotal || 0,
        inventario: producto.inventario || 0,
      }));
      setData(updatedData);
    }
  }, [products]); // Dependencia en `products`


  //enviar el pedido
  const handleSubmit = async (event) => {
    event.preventDefault(); // Evita que se recargue la página
  
    handleGetSession(); // Obtener sesión antes de enviar el pedido
  
    const pedidoData = {
      clienteId: id,
      productos: data,
      sessionInfo,
    };
  
    try {
      const response = await fetch(`/api/pedido/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(pedidoData),
      });
  
      console.log(response);
  
      if (!response.ok) {
        throw new Error("Error al guardar el pedido");
      }
  
      const result = await response.json();
      console.log("Pedido guardado con éxito:", result);
      // Redirigir a /dashboard si la respuesta es exitosa
      handleClear()
      
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleClear = () => {
    const params = new URLSearchParams(searchParams); // Obtener los parámetros actuales
    // Eliminar los parámetros `query` y `searchid`
    params.delete("query");
    params.delete("searchid");
  
    // Actualizar la URL sin recargar la página
    replace('/dashboard');
  };

  //funcion que almacena la sesion
  const handleGetSession = () => {
    const data = getSessionData("userSession");
    setSessionInfo(data);
  };

  const getSessionData = (key) => {
    if (typeof window !== "undefined") {
      const data = sessionStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    }
    return null;
  };
  

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

  const handleInventoryChange = (_id, value) => {
    setData((prevData) =>
      prevData.map((item) =>
        item._id === _id
          ? {
              ...item,
              inventario: value,
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

      <div className="flex-row justify-flex-start gap-medium mx-1 my-1">
        <p className="nameDescripcion btn-filter-fijo">Filtros</p>
        {["Sustratos", "Fertilizantes", "Fungicida", "Insecticida", "Varios"].map((cat) => (
          <p
            key={cat}
            onClick={() => changeCategory(cat)}
            className={filter === cat ? "btn-filter-hover" : "nameTitle btn-filter"}
          >
            {cat}
          </p>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex-row w-100">
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
              .filter((itm) => itm.category === filter)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((itm) => (
                <tr key={itm._id} className="table-row">
                  <td>
                    <input type="text" name="sku" className="input-field" value={itm.productId} readOnly />
                  </td>
                  <td>
                    <input type="text" className="input-field" value={itm.name} name="nombre" readOnly />
                  </td>
                  <td>
                    <input type="text" className="input-field" value={itm.price} name="price" readOnly />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="input-per"
                      name="inventario"
                      value={itm.inventario || ""}
                      onChange={(e) => handleInventoryChange(itm._id, Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      className="input-per"
                      name="cantidad"
                      value={itm.cantidad || ""}
                      onChange={(e) => handleChange(itm._id, Number(e.target.value))}
                    />
                  </td>
                  <td>
                    <p>{itm.subtotal.toLocaleString("es-ES")}</p>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <input type="text" name="idCliente" defaultValue={id} className="display-none" />
        <button type="submit"  className="button-full">Guardar pedido</button>
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
