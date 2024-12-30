"use server";
import Pedido from "@/model/Pedido";
import { getUser } from "@/utils/dal";
import { redirect } from "next/navigation";
//import { revalidateTag } from 'next/cache'


//activar los iconos
export async function handleIconClick(filterName) {
  
  console.log(`Server-side: ${filterName}`);
}


// funcion para llamar los pedidos
export async function getDataPedidos() {
  const roll = await getUser();
  const rol = roll.role;
  const pedidos = getPedidosRol(rol);
  return pedidos;
}

async function getPedidosRol(rol) {
  // roles = ['logistica', 'master', 'facturacion', 'ventas']
  switch (rol) {
    case "ventas":
    case "master":
      const pedidos1 = JSON.parse(JSON.stringify(await Pedido.find().lean()));
      return pedidos1;
    case "facturacion":
      const pedidos2 = JSON.parse(
        JSON.stringify(await Pedido.find({ status: "pending" }).lean())
      );
      return pedidos2;
    case "logistica":
      const pedidos3 = JSON.parse(
        JSON.stringify(await Pedido.find({ status: "delivered" }).lean())
      );
      return pedidos3;
  }
}

/*
const pedidos = JSON.parse(
  JSON.stringify(
    await Pedido.find({ status: { $in: ["pending", "delivered"] } }).lean()
  )
);
*/


// funcion para agregar nota y cambiar status
export async function upDateStatus(state, formData) {
  const user = await getUser();
  const id = formData.get("_id");
  const status = formData.get("status");
  const nota = formData.get("nota");
  const statusOrigen = formData.get("statusOrigen");
  const dataParams = formData.get('dataParams')
  const updates = {};

  if (nota) {
    updates.$push = {
      notas: {
        $each: [{ nota: nota, creador: user.user, fechaCracion: new Date() }],
        $position: 0, // Inserta al principio del arreglo
      },
    };
  }

  if (statusOrigen === "pending" && status === "delivered") {
    updates.$set = { status };
  } else if (
    statusOrigen === "pending" &&
    (status === "shipped" || status === "cancelled")
  ) {
    updates.$set = { status, statusUpdateDate: new Date() };
  } else if (statusOrigen === "delivered" && status === "pending") {
    updates.$set = { status };
  } else if (
    statusOrigen === "delivered" &&
    (status === "cancelled" || status === "shipped")
  ) {
    updates.$set = { status, statusUpdateDate: new Date() };
  } else if (statusOrigen === "cancelled" || statusOrigen === "shipped") {
    console.log("No se permite actualizar desde 'cancelled' o 'shipped'");
  } else {
    console.log("Estado no manejado");
  }

  if (Object.keys(updates).length === 0) {
    //return {message: 'ok'}
    //revalidateTag('/dashboard')
    redirect(dataParams);
  }
  try {
    await Pedido.findByIdAndUpdate(id, updates, { new: true });
    //return {message: 'ok'}
    //revalidateTag('/dashboard')
    redirect(dataParams);
  } catch (error) {
    //return {message: 'ok'}
    //revalidateTag('/dashboard')
    redirect(dataParams);
  }
    
}








//funcion para llamar pedidos con filtros
export async function getDataPedidosFilter(filter) {
  const pedidos = JSON.parse(
    JSON.stringify(await Pedido.find({ status: filter }).lean())
  );
  return pedidos;
}



