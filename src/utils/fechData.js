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