import React from "react";
import { unificarClientes } from "@/app/dashboard/history/action";

export default async function TablaPedidos({ dataHistory }) {
  const datos = await unificarClientes(dataHistory );
  console.log(datos[0].productos)

  return <div>T</div>;
}
















/*

const data = [
    {
      cel: "252525",
      contact: "Pablo Ramirez",
      email: "pablo@gmail.com",
      idCliente: 451014,
      name: "Vivero San Pablo",
      productos: [
        {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
        {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
      ]
    },
    {
        cel: "252525",
        contact: "Pablo Ramirez",
        email: "pablo@gmail.com",
        idCliente: 451014,
        name: "Vivero San Pablo",
        productos: [
          {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
          {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
        ]
      },
      {
        cel: "252527",
        contact: "jerry badilla",
        email: "jerry@gmail.com",
        idCliente: 451015,
        name: "Vivero San juan",
        productos: [
          {sku: 301019, nombre: 'Hormigren dp 750ml', category: 'Liquidos', price: 3500, cantidad:20},
          {sku: 301016, nombre: 'Multiaccion organico 1L', category: 'Liquidos', price: 4500, cantidad: 15}
        ]
      },
  ];
  */
