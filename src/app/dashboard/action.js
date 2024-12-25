"use server";
import Pedido from "@/model/Pedido";
import { getUser } from "@/utils/dal";
import { redirect } from "next/navigation";


export async function getDataPedidos(){
  const pedidos = JSON.parse (JSON.stringify(await Pedido.find().lean()))
  return pedidos
}

export async function upDateStatus(state, formData) {
  const user = await getUser();
  const id = formData.get("_id");
  const status = formData.get("status");
  const nota = formData.get("nota");
  const statusOrigen = formData.get("statusOrigen");
  const updates = {};

  if (nota) {
    updates.$push = {
      notas: { nota: nota, creador: user.user, fechaCracion: new Date() },
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
    redirect("/dashboard");
  }
  try {
    await Pedido.findByIdAndUpdate(id, updates, { new: true });
    redirect("/dashboard");
  } catch (error) {
    redirect("/dashboard");
  }
}


