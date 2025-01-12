"use server";
import { getUser } from "@/utils/dal";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";
import Pedidos from "@/model/Pedido";
import { redirect } from "next/navigation";




export async function getDataPedidos(filterRango) {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user
    //const pedidos = getPedidosRol(rol, filterRango, seller);
    const pedidos = await Pedidos.find({
        status: { $in: ["pending", "shipped", "delivered"] },
        createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut }
    }).lean()
    return pedidos;
  }

  export async function getDataPedidos2(filterRango, history) {
    const roll = await getUser();
    const rol = roll.role;
    const seller = roll.user
    //const pedidos = getPedidosRol(rol, filterRango, seller);
    const pedidos = await Pedidos.find({
        name: { $regex: history, $options: "i" },
        status: { $in: ["pending", "shipped", "delivered"] },
        createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut }
    }).lean()
    return pedidos;
  }
  


  export async function unificarClientes(data) {
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
  }







/*
export async function getHistoryClient(rangoFilter) {
    console.log({rangoFilter})
  try {
    await connectDB();
    const clientes = await Cliente.find({
      name: { $regex: history, $options: "i" },
    }).lean().populate("items");
    //const clientesReverse = clientes.reverse();
    return clientes;
  } catch (error) {
    return { message: "error" };
  }
}
*/
/*
// funcion para llamar los pedidos
export async function getDataPedidos(filterRango) {
  const roll = await getUser();
  const rol = roll.role;
  const seller = roll.user
  const pedidos = getPedidosRol(rol, filterRango, seller);
  return pedidos;
}

async function getPedidosRol(rol, filterRango, seller) {
  switch (rol) {
    case "master":
      const pedidos1 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos1;
    case "facturacion":
      const pedidos2 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "pending",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos2;
    case "logistica":
      const pedidos3 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "delivered",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )// funcion para llamar los pedidos
export async function getDataPedidos(filterRango) {
  const roll = await getUser();
  const rol = roll.role;
  const seller = roll.user
  const pedidos = getPedidosRol(rol, filterRango, seller);
  return pedidos;
}

async function getPedidosRol(rol, filterRango, seller) {
  switch (rol) {
    case "master":
      const pedidos1 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos1;
    case "facturacion":
      const pedidos2 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "pending",
            createdAt: { $gte: filterRan// funcion para llamar los pedidos
export async function getDataPedidos(filterRango) {
  const roll = await getUser();
  const rol = roll.role;
  const seller = roll.user
  const pedidos = getPedidosRol(rol, filterRango, seller);
  return pedidos;
}

async function getPedidosRol(rol, filterRango, seller) {
  switch (rol) {
    case "master":
      const pedidos1 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos1;
    case "facturacion":
      const pedidos2 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "pending",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos2;
    case "logistica":
      const pedidos3 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "delivered",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );// funcion para llamar los pedidos
export async function getDataPedidos(filterRango) {
  const roll = await getUser();
  const rol = roll.role;
  const seller = roll.user
  const pedidos = getPedidosRol(rol, filterRango, seller);
  return pedidos;
}

async function getPedidosRol(rol, filterRango, seller) {
  switch (rol) {
    case "master":
      const pedidos1 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos1;
    case "facturacion":
      const pedidos2 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "pending",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos2;
    case "logistica":
      const pedidos3 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "delivered",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos3;
    case "ventas":
      const pedidos4 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            vendedor: seller,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos4.reverse()

      default: 
      let pedidos5 = []
      return pedidos5
  }
  
}
      return pedidos3;
    case "ventas":
      const pedidos4 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            vendedor: seller,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos4.reverse()

      default: 
      let pedidos5 = []
      return pedidos5
  }
  
}go.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos2;
    case "logistica":
      const pedidos3 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            status: "delivered",
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos3;
    case "ventas":
      const pedidos4 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            vendedor: seller,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos4.reverse()

      default: 
      let pedidos5 = []
      return pedidos5
  }
  
}
      );
      return pedidos3;
    case "ventas":
      const pedidos4 = JSON.parse(
        JSON.stringify(
          await Pedido.find({
            vendedor: seller,
            createdAt: { $gte: filterRango.dataIn, $lte: filterRango.dataOut },
          }).lean()
        )
      );
      return pedidos4.reverse()

      default: 
      let pedidos5 = []
      return pedidos5
  }
  
}
  */