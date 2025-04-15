"use client";
import React from "react";
import { useState, useEffect } from "react";
import { useActionState } from "react";
import BarraProgreso from "@/app/dashboard/barraprogreso";
import { upDateStatus } from "@/app/dashboard/action";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Opcion from "@/app/dashboard/option";
import { RiDeleteBin6Line } from "react-icons/ri";
import { toast } from "sonner";
import { FaRegCopy } from "react-icons/fa";

export default function TablePedido({
  data,
  valorAncla1,
  valorAncla2,
  valorAncla3,
  rol,
  user,
}) {
  const [state, formAction, pending] = useActionState(upDateStatus, undefined);
  const [pedido, setPedido] = useState(data);
  const [dNone, setdNone] = useState("pedido-oculto");
  const [dNone2, setdNone2] = useState("pedido-oculto");
  const [textArea, setTextArea] = useState("pedido-oculto");
  const [statusNota, setStatusNota] = useState(true);
  const [status, setStatus] = useState(pedido.status);
  const [statusBol, setStatusBol] = useState(pedido.status);

  const router = useRouter(); // useRouter se define fuera del useEffect

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const dataParams = `${pathname}?${searchParams}`;

  function addAnclaParams(anclaLocal) {
    const params = new URLSearchParams(searchParams);
    if (anclaLocal) {
      params.set("ancla", anclaLocal);
    } else {
      params.delete("filter");
      params.delete("ancla");
      params.delete("searchid");
      params.delete("idPed");
    }
    replace(`${pathname}?${params.toString()}`);
  }

  function deletePedido(idPedido) {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    params.delete("ancla");
    params.delete("searchid");
    params.set("idPed", idPedido);
    replace(`${pathname}?${params.toString()}`);
  }

  function addAnclaId(valor, id) {
    // Obtener el almacenamiento local
    const data = localStorage.getItem("anclaje");
    const anclaLocal = data ? JSON.parse(data) : []; // Si no hay datos, inicializa
    // como un array vacío
    //setAnclas(anclaLocal)

    // Buscar si ya existe el objeto con el ID
    const existeId = anclaLocal.some((item) => item.id === id);

    if (!existeId) {
      // Buscar si ya existe un objeto con la misma posición
      const existePosicion = anclaLocal.some((item) => item.posicion === valor);

      if (!existePosicion) {
        // Agregar el nuevo objeto si no existe el ID ni la posición
        anclaLocal.push({ id, posicion: valor });
        localStorage.setItem("anclaje", JSON.stringify(anclaLocal));
        //setAnclas(anclaLocal);
        addAnclaParams(JSON.stringify(anclaLocal));
        //console.log('Nuevo anclaje agregado:', { id, posicion: valor });
      } else {
        //console.log('La posición ya existe, no se realiza ninguna acción.');
      }
    } else {
      //console.log('El ID ya existe, no se realiza ninguna acción.');
    }
  }

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
  function addTextArea() {
    if (textArea === "pedido-oculto") {
      setTextArea("pedido-col fadeIn");
      setStatusNota(false);
    } else {
      setTextArea("pedido-oculto");
      setStatusNota(true);
    }
  }

  const handleChange = (event) => {
    console.log("aqui estoy");
    console.log(event.target.value);
    if (event.target.value === status) {
      setStatus(event.target.value);
    } else {
      setStatus(event.target.value);
      //setStatusBol(!statusBol);
    }
  };

  // Función para copiar los códigos y cantidades al portapapeles
  const copyCodesAndQuantities = () => {
    // Crear un array con los datos en formato "sku: cantidad"
    const dataToCopy = pedido.productos.map(
      (itm) => `${itm.sku} ${itm.cantidad}`
    );

    // Unir los elementos del array en un solo string, separados por saltos de línea
    const textToCopy = dataToCopy.join("\n");

    // Copiar el texto al portapapeles
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        toast.success("Copiado al portapapeles");
      })
      .catch((err) => {
        console.error("Error al copiar al portapapeles:", err);
        toast.error("Error al copiar al portapapeles");
      });
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
            <p
              onClick={() => addTextArea()}
              className="w-1 font-sl button-nota"
            >
              + Add Nota
            </p>
            <p className="w-1 font-sx">
              <strong className="notas-center">
                {`${pedido.notas.length} notas`}
              </strong>
            </p>
            <input
              className="pedido-oculto"
              defaultValue={dataParams}
              name="dataParams"
              type="text"
            />
          </div>

          <div className="pedido-sub">
            <p className="w-3 font-sl">
              Status: <span className="textblue bold">{pedido.status}</span>
            </p>
            <div className=" font-sx">
              <Opcion
                handleChange={handleChange}
                statusBol={statusBol}
                rol={rol}
                status={pedido.status}
              />
            </div>
          </div>

          <div className="">
            <div className="pedido-sub-ancla">
              <p
                className={
                  valorAncla1?.id === pedido._id && valorAncla1.posicion === 1
                    ? "ancla-item-select"
                    : "ancla-item"
                }
                onClick={() => addAnclaId(1, pedido._id)}
              >
                1
              </p>
              <p
                className={
                  valorAncla2?.id === pedido._id && valorAncla2.posicion === 2
                    ? "ancla-item-select"
                    : "ancla-item"
                }
                onClick={() => addAnclaId(2, pedido._id)}
              >
                2
              </p>
              <p
                className={
                  valorAncla3?.id === pedido._id && valorAncla3.posicion === 3
                    ? "ancla-item-select"
                    : "ancla-item"
                }
                onClick={() => addAnclaId(3, pedido._id)}
              >
                3
              </p>
            </div>
          </div>
          {(user === pedido.vendedor || rol === "master") &&
            (status === "pendiente" || status === "aprobado") && (
              <div
                onClick={() => deletePedido(pedido._id)}
                className="delete-pedido"
              >
                <RiDeleteBin6Line className="icon-delete" />
                <p>
                  <span className="text-delete">Eliminar pedido</span>
                </p>
              </div>
            )}

          <div className="pedido-sub pedido-oculto">
            <input name="_id" id="_id" defaultValue={pedido._id} type="text" />
            <input
              name="statusOrigen"
              id="statusOrigen"
              defaultValue={pedido.status}
              type="text"
            />
          </div>
          {statusBol !== status && (
            <div className="pedido-sub-button">
              <p className=""></p>
              <button className="pedido-botton bold">Guardar status...</button>
            </div>
          )}
        </div>
        <div className={`${textArea}`}>
          <label className="nota-label" htmlFor="">
            Nota
          </label>
          <textarea name="nota" id="nota"></textarea>
          {statusNota !== true && (
            <div className="pedido-sub-button">
              <p className=""></p>
              <button className="pedido-botton bold">Guardar nota...</button>
            </div>
          )}
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
              {dNone === "pedido-oculto" ? "Ver detalle..." : "ocultar detalle"}
            </strong>
          </p>

          <p>
            {pedido.notas.length === 0 ? (
              <strong className="font-sl pedido-button">
                {dNone2 === "pedido-oculto" ? "Ver notas..." : "ocultar notas"}
              </strong>
            ) : (
              <strong
                onClick={() => displayNone2()}
                className="font-sl pedido-button"
              >
                {dNone2 === "pedido-oculto" ? "Ver notas..." : "ocultar notas"}
              </strong>
            )}
          </p>
        </div>

        <div className={`${dNone} `}>
          <p className="w-15">
            <strong>Pedido:</strong>
          </p>
          <table className="w-75">
            <thead>
              <tr>
                <th>Codigo</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {pedido.productos.map((itm, index) => (
                <tr key={index}>
                  <td>{itm.sku}</td>
                  <td>{itm.nombre}</td>
                  <td>{itm.cantidad}</td>
                  <td>
                    {(itm.price * itm.cantidad).toLocaleString("es-ES", {
                      style: "currency",
                      currency: "CRC",
                    })}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="w-15">
            <FaRegCopy className="icon-copy" onClick={copyCodesAndQuantities} />
          </p>
        </div>
        <div className={`${dNone2} pedido-col`}>
          <p className="w-15">
            <strong>Notas:</strong>
          </p>
          <ul className="lista-notas w-75">
            {pedido.notas.map((itm, index) => (
              <li key={index} className="nota-item">
                <span className="nota-punto ">•</span>
                <span className="nota-contenido font-sl">
                  <strong className="font-sl">{itm.creador}</strong> -{" "}
                  {new Date(itm.fechaCreacion).toLocaleDateString("es-ES", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                  : {itm.nota}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </form>
      <p className="font-sm">
        Vendedor: <strong>{}</strong>
        {pedido.vendedor}{" "}
      </p>
    </div>
  );
}
/*

*/
