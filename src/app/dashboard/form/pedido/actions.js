'use server'
import {connectDB} from '@/utils/dbserver'
import Cliente from '@/model/Cliente'


export async function getClientePedido(query){
   try {
    await connectDB()
    const clientes = await Cliente.find({ name: { $regex: query, $options: 'i' } }).lean();
    const clientesReverse = clientes.reverse()
    return clientesReverse
   } catch (error) {
      return {message: "error"}
   }
}

export async function addPedidotBd(state, formData) {
   // Convertir FormData a un array de entradas
   const entries = Array.from(formData.entries());
 
   // Filtrar las claves internas generadas por Next.js
   const filteredData = entries.filter(([key]) => !key.startsWith('$'));
 
   // Convertir a un objeto plano
   const data = Object.fromEntries(filteredData);
 
   // Aquí puedes realizar cualquier lógica adicional, como validaciones o transformaciones
   //console.log('Datos procesados:', data);
 
   // Simulación de guardar los datos en la base de datos (reemplaza con tu lógica real)
   const pedido = {
     idCliente: data.idCliente,
     productos: [],
   };
 
   // Agrupar los productos según los campos (sku, nombre, category, etc.)
   const productosKeys = ['sku', 'nombre', 'category', 'prece', 'cantidad'];
   let productoTemp = {};
 
   filteredData.forEach(([key, value]) => {
     if (productosKeys.includes(key)) {
       productoTemp[key] = value;
     }
 
     // Cuando todos los datos de un producto están listos, verifica si son válidos
     if (Object.keys(productoTemp).length === productosKeys.length) {
       // Excluir productos donde `cantidad` o cualquier otro campo sea ''
       if (productoTemp.cantidad !== '' && productoTemp.sku !== '' && productoTemp.nombre !== '') {
         pedido.productos.push(productoTemp);
       }
       productoTemp = {};
     }
   });
 
   console.log('Pedido estructurado:', pedido);
 
   // Guardar en la base de datos (reemplaza con tu función de guardado)
   try {
     // Ejemplo de guardado:
     // await PedidoModel.create(pedido);
     console.log('Pedido guardado exitosamente en la BD');
   } catch (error) {
     console.error('Error al guardar el pedido:', error);
   }
 }
 