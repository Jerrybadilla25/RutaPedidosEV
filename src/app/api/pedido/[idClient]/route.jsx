import { NextResponse, NextRequest } from "next/server";
import { connectDB } from "@/utils/dbserver";
import Cliente from "@/model/Cliente";
import { getUser } from "@/utils/dal";
import Pedido from "@/model/Pedido";
import { createDelivery } from "@/utils/creteSku";


export async function POST(request, { params }) {
  try {
    await connectDB();

    const body = await request.json();
    const { clienteId, productos, sessionInfo } = body;

    //console.log("ID Cliente:", clienteId);
    //console.log("Datos de la sesión:", sessionInfo);

    const bdSave = await addPedidotBd(clienteId, productos);

    if (bdSave.message === 'success') {
      //return NextResponse.redirect(new URL('/dashboard', request.url))
      return NextResponse.json({ message: "success" });
    } else {
      return NextResponse.json(
        { message: "No se pudo crear el pedido", error: bdSave.error },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error("Error al crear el pedido:", error);
    return NextResponse.json(
      { message: "No se pudo crear el pedido", error: error.message },
      { status: 400 }
    );
  }
}



async function addPedidotBd(clienteId, productData) {
    try {
      // Verifica que productData sea un array
      if (!Array.isArray(productData)) {
        throw new Error("productData debe ser un array");
      }
  
      // Filtra los productos con cantidad mayor a 0
      const productosFiltrados = productData.filter((producto) => producto.cantidad > 0);
  
      // Si no hay productos válidos, lanza un error
      if (productosFiltrados.length === 0) {
        throw new Error("No hay productos con cantidad mayor a 0");
      }
  
      // Crea el objeto pedido
      const pedido = {
        idCliente: clienteId,
        productos: productosFiltrados.map((producto) => ({
          sku: producto.productId,       // Incluye el SKU
          nombre: producto.name, // Incluye el nombre
          price: producto.price,   // Incluye el precio
          cantidad: producto.cantidad, // Incluye la cantidad
        })),
      };
  
      // Busca el cliente en la base de datos
      const IdCliente = await Cliente.findById(pedido.idCliente);
      if (!IdCliente) {
        throw new Error("Cliente no encontrado");
      }
  
      // Configura las fechas y otros datos
      const savedDate = new Date();
      const statusUpdateDate = new Date(savedDate);
      statusUpdateDate.setDate(savedDate.getDate() + 7);
      const shippingAddress = IdCliente.address;
      const userCreator = await getUser();
      const vendedor = userCreator.user;
      const delivery = await createDelivery();
  
      // Calcula el totalAmount usando un bucle for
      let totalAmount = 0;
      for (let i = 0; i < pedido.productos.length; i++) {
        const precio = pedido.productos[i].price;
        const cantidad = pedido.productos[i].cantidad;
        const total = precio * cantidad;
        totalAmount = totalAmount + total;
      }
  
      // Crea el nuevo pedido
      const newPedido = new Pedido({
        orderId: delivery,
        vendedor: vendedor,
        productos: pedido.productos, // Incluye SKU, nombre, price y cantidad
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
  
      // Actualiza el cliente con el nuevo pedido
      IdCliente.items.push(newPedido._id);
      await Cliente.findByIdAndUpdate(IdCliente._id, { $set: { items: IdCliente.items } });
  
      // Guarda el pedido en la base de datos
      await newPedido.save();
  
      console.log("Pedido guardado exitosamente en la BD");
      return { message: 'success' };
    } catch (error) {
      console.error("Error al guardar el pedido:", error);
      return { message: 'error', error: error.message };
    }
  }