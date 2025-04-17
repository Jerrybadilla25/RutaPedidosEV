"use server";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";
import { getUser } from "@/utils/dal";
import Pedido from "@/model/Pedido";
import { createDelivery } from "@/utils/creteSku";
import { redirect } from "next/navigation";

export async function getClientePedido(query) {
  try {
    await connectDB();
    const clientes = await Cliente.find({
      name: { $regex: query, $options: "i" },
    }).limit(5).lean();
    const clientesReverse = clientes.reverse();
    return clientesReverse;
  } catch (error) {
    return { message: "error" };
  }
}

export async function addPedidotBd(state, formData) {
  const entries = Array.from(formData.entries());
  const filteredData = entries.filter(([key]) => !key.startsWith("$"));
  const data = Object.fromEntries(filteredData);
  const pedido = {
    idCliente: data.idCliente,
    productos: [],
  };
  const productosKeys = ["sku", "nombre", "price", "cantidad"];
  let productoTemp = {};

  filteredData.forEach(([key, value]) => {
    if (productosKeys.includes(key)) {
      productoTemp[key] = value;
    }
    if (Object.keys(productoTemp).length === productosKeys.length) {
      if (
        productoTemp.cantidad !== "" &&
        productoTemp.sku !== "" &&
        productoTemp.nombre !== ""
      ) {
        pedido.productos.push(productoTemp);
      }
      productoTemp = {};
    }
  });
  const IdCliente = await Cliente.findById(pedido.idCliente);
  const savedDate = new Date();
  const statusUpdateDate = new Date(savedDate);
  statusUpdateDate.setDate(savedDate.getDate() + 7);
  const shippingAddress = IdCliente.address;
  const userCreator = await getUser();
  const vendedor = userCreator.user;
  const delivery = await createDelivery();
  let totalAmount = 0;

  for (let i = 0; i < pedido.productos.length; i++) {
    let precio = pedido.productos[i].price;
    let cantidad = pedido.productos[i].cantidad;
    let total = precio * cantidad;
    totalAmount = totalAmount + total;
  }

  // Guardar en la base de datos (reemplaza con tu función de guardado)
  try {
    const newPedido = Pedido({
      orderId: delivery,
      vendedor: vendedor,
      productos: pedido.productos,
      idCliente: IdCliente.clientId,
      name: IdCliente.name,
      email: IdCliente.email,
      cel: IdCliente.cel,
      contact: IdCliente.contact,
      totalAmount,
      shippingAddress,
      statusUpdateDate,
      notas: [],
    });
    IdCliente.items.push(newPedido._id);
    await Cliente.findByIdAndUpdate(IdCliente._id, {
      $set: {
        items: IdCliente.items,
      },
    });
    await newPedido.save();
    console.log("Pedido guardado exitosamente en la BD");
  } catch (error) {
    console.error("Error al guardar el pedido:", error);
  }
  redirect("/dashboard");
}
