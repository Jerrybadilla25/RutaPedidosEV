"use server";
import Pedido from "@/model/Pedido";
import Cliente from "@/model/Cliente";
import { getUser } from "@/utils/dal";
import { redirect } from "next/navigation";

// Activar los iconos
export async function handleIconClick(filterName) {
  try {
    console.log(`Server-side: ${filterName}`);
  } catch (error) {
    console.error("Error al manejar el clic del ícono:", error);
  }
}

// funcion para eliminar pedidos
export async function deletePedido(id) {
  try {
    let data = await Pedido.findById(id);

    if (!data) {
      return { msj: "El pedido no existe", success: false };
    }

    if (data.status === "pending" || data.status === "cancelled") {
      let cliente = await Cliente.findOne({ clientId: data.idCliente });

      if (cliente) {
        await Cliente.updateOne(
          { _id: cliente._id },
          { $pull: { items: id } }
        );
      }

      await Pedido.findByIdAndDelete(id);

      return { msj: "Pedido eliminado correctamente", success: true };
    }

    return { msj: "El pedido no puede eliminarse", success: false };
  } catch (error) {
    console.log(error);
    return { msj: "Error eliminando el pedido", success: false };
  }
}

// Función para llamar pedidos con filtros
export async function getDataPedidosFilter(filter, filterRango) {
  try {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user;

    if (rol !== "ventas") {
      const pedidos = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: filter,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos;
    } else {
      const pedidos = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            vendedor: seller,
            status: filter,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos.reverse();
    }
  } catch (error) {
    console.error("Error al obtener pedidos con filtros:", error);
    return [];
  }
}

// Función para llamar los pedidos
export async function getDataPedidos(filterRango) {
  try {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user;
    const pedidos = await getPedidosRol(rol, filterRango, seller);
    return pedidos;
  } catch (error) {
    console.error("Error al obtener pedidos:", error);
    return [];
  }
}

async function getPedidosRol(rol, filterRango, seller) {
  try {
    switch (rol) {
      case "master":
        return await fetchPedidos({
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "facturacion":
        return await fetchPedidos({
          status: "delivered",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "logistica":
        return await fetchPedidos({
          status: "pending",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "ventas":
        return (
          await fetchPedidos({
            vendedor: seller,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          })
        ).reverse();
      default:
        return [];
    }
  } catch (error) {
    console.error("Error en la asignación de pedidos según rol:", error);
    return [];
  }
}

async function fetchPedidos(query) {
  try {
    return JSON.parse(JSON.stringify(await Pedido.find(query).lean()));
  } catch (error) {
    console.error("Error al obtener pedidos de la base de datos:", error);
    return [];
  }
}


// Función para agregar nota y cambiar status
export async function upDateStatus(state, formData) {
  const user = await getUser();
  const id = formData.get("_id");
  const status = formData.get("status");
  const nota = formData.get("nota");
  const statusOrigen = formData.get("statusOrigen");
  const dataParams = formData.get("dataParams");
  const updates = {};

  // Siempre inicializamos $push para notas (si no existe)
  updates.$push = {
    notas: {
      $each: [],
      $position: 0,
    },
  };

  // Agregar nota manual si existe
  if (nota) {
    updates.$push.notas.$each.push({
      nota: nota,
      creador: user.user,
      fechaCracion: new Date(),
    });
  }

  // Agregar nota automática si el estado cambió
  if (statusOrigen !== status) {
    updates.$push.notas.$each.push({
      nota: `Cambio de estado automático: de "${statusOrigen}" a "${status}"`,
      creador: user.user,
      fechaCracion: new Date(),
    });
  }

  // Lógica de actualización de estado
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

  // Si no hay cambios relevantes, redirigir sin actualizar
  if (Object.keys(updates).length === 0 || (updates.$set === undefined && updates.$push.notas.$each.length === 0)) {
    redirect(dataParams);
    return;
  }

  try {
    await Pedido.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
  }
  redirect(dataParams);
}
