"use client";
import React, { useState, useEffect } from "react";


export default function TablaCodigos({ dataHistory }) {
  console.log(dataHistory.length)
  const [data, setData] = useState(dataHistory?.[0]?.items || []);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    // Función para agrupar los productos
    const agruparProductos = (data) => {
      const productosAgrupados = [];
      // Iterar sobre el array principal
      data.forEach((elemento) => {
        if (elemento.productos && Array.isArray(elemento.productos)) {
          // Iterar sobre el array de productos
          elemento.productos.forEach((producto) => {
            const { sku, cantidad, nombre, price } = producto;

            // Buscar si el código ya está en productosAgrupados
            const productoExistente = productosAgrupados.find(
              (item) => item.sku === sku
            );

            if (productoExistente) {
              // Si ya existe, sumar cantidad y total
              productoExistente.cantidad += cantidad;
              productoExistente.total += cantidad * price;
            } else {
              // Si no existe, agregarlo al nuevo array
              productosAgrupados.push({
                sku,
                nombre,
                cantidad,
                total: cantidad * price,
              });
            }
          });
        }
      });

      return productosAgrupados;
    };

    // Agrupar los productos y actualizar el estado
    const productosAgrupados = agruparProductos(data);
    setProductos(productosAgrupados);
  }, [data]);

  return (
    <div className="box-history-container">
      <h1 className="roboto text-warning">Historial de Productos</h1>
      {dataHistory.map((itm) => (
        <div key={itm._id}>
          <div className="box-history">
            <div className="flex-row justify-between gap-medium ">
              <p className="flex-column">
                <strong className="nameTitle font-sm">Id Cliente </strong>
                <strong>{itm.clientId}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Nombre </strong>
                <strong>{itm.name}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Contacto </strong>
                <strong>{itm.contact}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm"> Status </strong>
                <strong>{itm.status}</strong>
              </p>
              <p className="flex-column">
                <strong className="nameTitle font-sm">Direccion</strong>
                <strong>
                  {itm.address.provincia}, {itm.address.canton},{" "}
                  {itm.address.distrito}{" "}
                </strong>
              </p>
            </div>
          </div>
        </div>
      ))}
      

     {
      productos.length>=1 & dataHistory.length===1?
      <div className="flex-column my-1">
      <h3>Productos Agrupados</h3>
      <table className="table-full">
        <thead>
          <tr>
            <th></th>
            <th>Codigo</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((producto, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{producto.sku}</td>
              <td>{producto.nombre}</td>
              <td>{producto.cantidad}</td>

              <td className="text-warning">
                {producto.total.toLocaleString("es-ES", {
                  style: "currency",
                  currency: "CRC",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>:<p></p>
     }
    </div>
  );
}
