"use server";
import Pedido from "@/model/Pedido";
import { ObjectId } from 'mongodb';
import Product from '@/model/Product'

export async function editPedido(query, dell, cant, dele, qty, add) {
  try {
    if (!query) {
      return null;
    }

    // Caso 1: Búsqueda simple
    if (query && !dell && !cant && !dele && !add) {
      const pedido = await Pedido.findOne({ orderId: query }).lean();
      return pedido;
    }

    // Caso 2: Actualizar cantidad
    if (query && dell && cant !== null && !dele && !add) {
      const session = await Pedido.startSession();
      session.startTransaction();
      
      try {
        // 1. Actualizar la cantidad
        const pedido = await Pedido.findOneAndUpdate(
          {
            orderId: query,
            "productos._id": new ObjectId(dell)
          },
          {
            $set: {
              "productos.$.cantidad": cant
            }
          },
          { new: true, session }
        );

        if (!pedido) {
          throw new Error("Pedido o producto no encontrado");
        }

        // 2. Recalcular el total
        const nuevoTotal = pedido.productos.reduce(
          (total, p) => total + (p.price * p.cantidad),
          0
        );

        await Pedido.updateOne(
          { orderId: query },
          { $set: { totalAmount: nuevoTotal } },
          { session }
        );

        await session.commitTransaction();
        session.endSession();

        return await Pedido.findOne({ orderId: query }).lean();
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    }

    // Caso 3: Eliminar producto
    if (query && dell && dele && !add) {
      const session = await Pedido.startSession();
      session.startTransaction();
      
      try {
        // 1. Eliminar el producto
        const pedido = await Pedido.findOneAndUpdate(
          { orderId: query },
          {
            $pull: {
              productos: { _id: new ObjectId(dell) }
            }
          },
          { new: true, session }
        );

        if (!pedido) {
          throw new Error("Pedido no encontrado");
        }

        // 2. Recalcular el total
        const nuevoTotal = pedido.productos.reduce(
          (total, p) => total + (p.price * p.cantidad),
          0
        );

        await Pedido.updateOne(
          { orderId: query },
          { $set: { totalAmount: nuevoTotal } },
          { session }
        );

        await session.commitTransaction();
        session.endSession();

        return await Pedido.findOne({ orderId: query }).lean();
      } catch (error) {
        await session.abortTransaction();
        session.endSession();
        throw error;
      }
    }

    // Caso 4: Agregar nuevo producto
if (query && add && !dell && !dele && qty && !cant) {
   const session = await Pedido.startSession();
   session.startTransaction();
   
   try {
     // 1. Verificar que el ID tenga el formato correcto
     if (!ObjectId.isValid(add)) {
       throw new Error(`ID de producto no válido: ${add}`);
     }
 
     // 2. Convertir a ObjectId
     const IdProducto = new ObjectId(add);
 
     // 3. Buscar el producto en la colección Product
     const producto = await Product.findById(IdProducto);
     
     if (!producto) {
       throw new Error(`Producto con ID ${add} no encontrado`);
     }
 
     // 4. Crear el nuevo item para el pedido
     const nuevoProducto = {
       sku: producto.productId,
       nombre: producto.name,
       price: producto.price,
       cantidad: Number(qty),
       _id: new ObjectId() // Nuevo ID para este item en el pedido
     };
 
     // 5. Agregar al array de productos del pedido
     let pedido = await Pedido.findOneAndUpdate(
       { orderId: query },
       { $push: { productos: nuevoProducto } },
       { new: true, session }
     );
 
     if (!pedido) {
       throw new Error("Pedido no encontrado");
     }
 
     // 6. Recalcular el total
     const nuevoTotal = pedido.productos.reduce(
       (total, p) => total + (p.price * p.cantidad),
       0
     );
 
     await Pedido.updateOne(
       { orderId: query },
       { $set: { totalAmount: nuevoTotal } },
       { session }
     );
 
     await session.commitTransaction();
     session.endSession();
 
     return await Pedido.findOne({ orderId: query }).lean();
   } catch (error) {
     await session.abortTransaction();
     session.endSession();
     console.error("Error al agregar producto:", {
       query,
       add,
       qty,
       error: error.message
     });
     throw error;
   }
 }

    throw new Error("Parámetros inválidos");
  } catch (error) {
    console.error("Error en editPedido:", error);
    throw error;
  }
}
