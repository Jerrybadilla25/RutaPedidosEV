import React from 'react'
import {Suspense} from 'react'
//import Home from '@/components/home'
import {connectDB} from '@/utils/dbserver'
import TablaPedido from '@/app/dashboard/tablePedido'
import Pedido from '@/model/Pedido'


export default async function Homepage() {
  connectDB()
  const pedidos = JSON.parse (JSON.stringify(await Pedido.find().lean())) 
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