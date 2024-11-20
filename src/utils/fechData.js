'use server'
import {connectDB} from '@/utils/dbserver'
import Cliente from '@/model/Cliente'


export async function getClientePedido(query){
    console.log(query)
   try {
    await connectDB()
    const clientes = await Cliente.find({ name: { $regex: query, $options: 'i' } });
    return clientes
   } catch (error) {
      return {message: "error"}
   }
}