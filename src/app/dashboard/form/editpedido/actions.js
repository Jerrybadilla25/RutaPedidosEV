'use server'
import Pedido from '@/model/Pedido'

export async function editPedido(query) {
   const pedido = await Pedido.findOne({orderId:query}).lean()
   return pedido
}