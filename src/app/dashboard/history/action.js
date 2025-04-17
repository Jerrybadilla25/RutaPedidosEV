"use server";
import { getUser } from "@/utils/dal";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";
import Pedidos from "@/model/Pedido";
import { redirect } from "next/navigation";

export async function getDataPedidos(filterRango) {
  try {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user;

    const pedidos = await Pedidos.find({
      status: { $in: ["pendiente", "enviado", "facturado"] },
      createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
    }).limit(6).lean();

    return pedidos;
  } catch (error) {
    console.error("Error en getDataPedidos:", error);
    return [];
  }
}

export async function getDataPedidos2(filterRango, history) {
  try {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user;

    const pedidos = await Pedidos.find({
      name: { $regex: history, $options: "i" },
      status: { $in: ["pendiente", "enviado", "facturado"] },
      createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
    }).limit(6).lean();

    return pedidos;
  } catch (error) {
    console.error("Error en getDataPedidos2:", error);
    return [];
  }
}

export async function unificarClientes(data) {
  try {
    return data.reduce((acumulador, actual) => {
      // Verificar si el cliente ya existe en el acumulador
      const clienteExistente = acumulador.find(
        (cliente) => cliente.idCliente === actual.idCliente
      );

      if (clienteExistente) {
        // Si el cliente ya existe, sumar las cantidades y agregar al total
        actual.productos.forEach((producto) => {
          const productoExistente = clienteExistente.productos.find(
            (prod) => prod.sku === producto.sku
          );

          if (productoExistente) {
            // Si el producto ya existe, sumar cantidad
            productoExistente.cantidad += producto.cantidad;
          } else {
            // Si el producto no existe, agregarlo
            clienteExistente.productos.push({ ...producto });
          }
        });

        // Actualizar el total
        clienteExistente.total += actual.productos.reduce(
          (suma, prod) => suma + prod.price * prod.cantidad,
          0
        );
      } else {
        // Si el cliente no existe, agregarlo al acumulador
        acumulador.push({
          ...actual,
          total: actual.productos.reduce(
            (suma, prod) => suma + prod.price * prod.cantidad,
            0
          ),
        });
      }

      return acumulador;
    }, []);
  } catch (error) {
    console.error("Error en unificarClientes:", error);
    return [];
  }
}
