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
    // 1. Verificar usuario y obtener el pedido
    const user = await getUser();
    const pedido = await Pedido.findById(id);

    if (!pedido) {
      return { msj: "El pedido no existe", success: false };
    }

    // 2. Si NO es master, validar el estado del pedido
    if (user.role !== "master") {
      const estadosEliminables = ["pendiente", "cancelado"];
      if (!estadosEliminables.includes(pedido.status)) {
        return {
          msj: "Solo se pueden eliminar pedidos pendientes o cancelados",
          success: false,
        };
      }
    }

    // 3. Eliminar referencia en cliente (si existe)
    const cliente = await Cliente.findOne({ clientId: pedido.idCliente });
    if (cliente) {
      await Cliente.updateOne({ _id: cliente._id }, { $pull: { items: id } });
    }

    // 4. Eliminar el pedido
    await Pedido.findByIdAndDelete(id);
    console.log("Pedido eliminado correctamente");
    return { msj: "Pedido eliminado correctamente", success: true };
  } catch (error) {
    console.error("Error eliminando pedido:", error);
    return { msj: "Error al procesar la eliminación", success: false };
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
          status: { $ne: "enviado" }, // Excluye pedidos con status "enviado"
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "approver":
        return await fetchPedidos({
          status: "pendiente",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "picker":
        return await fetchPedidos({
          status: "aprobado",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "invoicer":
        return await fetchPedidos({
          status: "alistado",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "shipper":
        return await fetchPedidos({
          status: "facturado",
          createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
        });
      case "seller":
        return (
          await fetchPedidos({
            vendedor: seller,
            status: { $ne: "enviado" }, // Excluye pedidos con status "enviado"
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

//llama los pedidos es un callback
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

  //validar nota manual y nota automatica
  if (nota && status === null) {
    addNotaManual(status, statusOrigen, nota, user, updates);
  } else {
    addNotaYStatus(status, statusOrigen, nota, user, updates);
  }

  // Si no hay cambios relevantes, redirigir sin actualizar
  if (
    Object.keys(updates).length === 0 ||
    (updates.$set === undefined && updates.$push.notas.$each.length === 0)
  ) {
    redirect(dataParams);
  }

  try {
    await Pedido.findByIdAndUpdate(id, updates, { new: true });
  } catch (error) {
    console.error("Error al actualizar el pedido:", error);
  }
  redirect(dataParams);
}

function agregarNotaCambioEstado(updates, statusOrigen, status, user) {
  // Verificar si hubo cambio de estado
  if (statusOrigen !== status) {
    updates.$push.notas.$each.push({
      nota: `Cambio de estado automático: de "${statusOrigen}" a "${status}"`,
      creador: user.user,
      fechaCreacion: new Date(),
    });
  }

  return updates;
}

function addNotaManual(status, statusOrigen, nota, user, updates) {
  // Agregar nota manual si existe
  if (nota && status === null) {
    updates.$push.notas.$each.push({
      nota: nota,
      creador: user.user,
      fechaCreacion: new Date(),
    });
  }
}

function addNotaYStatus(status, statusOrigen, nota, user, updates) {
  // Lógica de actualización de estado
  if (user.role === "master") {
    updates.$set = { status, updatedAt: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "pendiente" && status === "aprobado") {
    updates.$set = { status, updatedAt: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "rechazado" && status === "pendiente") {
    updates.$set = { status, updatedAt: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "aprobado" && status === "alistado") {
    updates.$set = { status, updatedAt: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "alistado" && status === "facturado") {
    updates.$set = { status };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "facturado" && status === "enviado") {
    updates.$set = { status, statusUpdateDate: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else if (statusOrigen === "pendiente" || status === "cancelado") {
    updates.$set = { status, updatedAt: new Date() };
    agregarNotaCambioEstado(updates, statusOrigen, status, user);
  } else {
    console.log("Estado no manejado");
  }
}
