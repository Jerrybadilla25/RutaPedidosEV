import React from 'react'
import {Suspense} from 'react'
//import Home from '@/components/home'
import {connectDB} from '@/utils/dbserver'
import TablaPedido from '@/app/dashboard/tablePedido'
import Pedido from '@/model/Pedido'


export default async function Homepage() {
  connectDB()
  const idKey = 1
  const pedidos = JSON.parse (JSON.stringify(await Pedido.find().lean())) 
  console.log(pedidos[0])
  return (
    <Suspense  fallback={<p>Cargando pedidos...</p>} >
      {
        pedidos.map((pedido)=>(
          <TablaPedido key={pedido._id} pedido={pedido}/>
        ))
      }
      
    </Suspense>
  );
}