"use server";
import Pedido from "@/model/Pedido";
import { ObjectId } from 'mongodb';
import Product from '@/model/Product'



export async function editPedido(query, dell, cant, dele, qty, add, user) {
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
        // 1. Verificar que el producto existe en el pedido
        const pedidoExistente = await Pedido.findOne({
          orderId: query,
          "productos._id": new ObjectId(dell)
        }).session(session);

        if (!pedidoExistente) {
          throw new Error("Pedido o producto no encontrado");
        }

        // 2. Obtener información del producto
        const producto = pedidoExistente.productos.find(p => p._id.equals(new ObjectId(dell)));
        const cantidadAnterior = producto.cantidad;

        // 3. Actualizar cantidad y agregar nota
        const updatedPedido = await Pedido.findOneAndUpdate(
          {
            orderId: query,
            "productos._id": new ObjectId(dell)
          },
          {
            $set: { "productos.$.cantidad": Number(cant) },
            $push: {
              notas: {
                $each: [{
                  nota: `Cantidad modificada: ${producto.nombre} (SKU: ${producto.sku}) de ${cantidadAnterior} a ${cant}`,
                  creador: user,
                  fechaCreacion: new Date()
                }],
                $position: 0
              }
            }
          },
          { new: true, session }
        );

        // 4. Recalcular el total
        const nuevoTotal = updatedPedido.productos.reduce(
          (total, p) => total + (p.price * p.cantidad),
          0
        );

        await Pedido.updateOne(
          { orderId: query },
          { $set: { totalAmount: nuevoTotal } },
          { session }
        );

        await session.commitTransaction();
        return updatedPedido.toObject();
      } catch (error) {
        await session.abortTransaction();
        console.error("Error en actualización de cantidad:", error.message);
        throw error;
      } finally {
        session.endSession();
      }
    }

    // Caso 3: Eliminar producto
    if (query && dell && dele && !add) {
      const session = await Pedido.startSession();
      session.startTransaction();
      
      try {
        // 1. Verificar que el producto existe
        const pedidoExistente = await Pedido.findOne({
          orderId: query,
          "productos._id": new ObjectId(dell)
        }).session(session);

        if (!pedidoExistente) {
          throw new Error("Pedido o producto no encontrado");
        }

        // 2. Obtener información del producto a eliminar
        const productoEliminar = pedidoExistente.productos.find(p => p._id.equals(new ObjectId(dell)));

        // 3. Eliminar producto y agregar nota
        const updatedPedido = await Pedido.findOneAndUpdate(
          { orderId: query },
          {
            $pull: { productos: { _id: new ObjectId(dell) } },
            $push: {
              notas: {
                $each: [{
                  nota: `Producto eliminado: ${productoEliminar.nombre} (SKU: ${productoEliminar.sku}) - Cantidad: ${productoEliminar.cantidad}`,
                  creador: user,
                  fechaCreacion: new Date()
                }],
                $position: 0
              }
            }
          },
          { new: true, session }
        );

        // 4. Recalcular el total
        const nuevoTotal = updatedPedido.productos.reduce(
          (total, p) => total + (p.price * p.cantidad),
          0
        );

        await Pedido.updateOne(
          { orderId: query },
          { $set: { totalAmount: nuevoTotal } },
          { session }
        );

        await session.commitTransaction();
        return updatedPedido.toObject();
      } catch (error) {
        await session.abortTransaction();
        console.error("Error en eliminación de producto:", error.message);
        throw error;
      } finally {
        session.endSession();
      }
    }

    // Caso 4: Agregar nuevo producto
    if (query && add && !dell && !dele && qty && !cant) {
      const session = await Pedido.startSession();
      session.startTransaction();
      
      try {
        // 1. Validar ID del producto
        if (!ObjectId.isValid(add)) {
          throw new Error(`ID de producto no válido: ${add}`);
        }
    
        // 2. Buscar el producto en la colección Product
        const producto = await Product.findById(new ObjectId(add)).session(session);
        
        if (!producto) {
          throw new Error(`Producto con ID ${add} no encontrado`);
        }
    
        // 3. Crear nuevo item para el pedido
        const nuevoProducto = {
          sku: producto.productId,
          nombre: producto.name,
          price: producto.price,
          cantidad: Number(qty),
          _id: new ObjectId()
        };
    
        // 4. Agregar producto y nota
        const updatedPedido = await Pedido.findOneAndUpdate(
          { orderId: query },
          {
            $push: {
              productos: nuevoProducto,
              notas: {
                $each: [{
                  nota: `Producto agregado: ${producto.name} (SKU: ${producto.productId}) - Cantidad: ${qty} - Precio: ${producto.price}`,
                  creador: user,
                  fechaCreacion: new Date()
                }],
                $position: 0
              }
            }
          },
          { new: true, session }
        );
    
        if (!updatedPedido) {
          throw new Error("Pedido no encontrado");
        }
    
        // 5. Recalcular el total
        const nuevoTotal = updatedPedido.productos.reduce(
          (total, p) => total + (p.price * p.cantidad),
          0
        );
    
        await Pedido.updateOne(
          { orderId: query },
          { $set: { totalAmount: nuevoTotal } },
          { session }
        );
    
        await session.commitTransaction();
        return updatedPedido.toObject();
      } catch (error) {
        await session.abortTransaction();
        console.error("Error al agregar producto:", error.message);
        throw error;
      } finally {
        session.endSession();
      }
    }

    throw new Error("Combinación de parámetros no válida");
  } catch (error) {
    console.error("Error en editPedido:", {
      params: { query, dell, cant, dele, qty, add, user },
      error: error.message
    });
    throw error;
  }
}