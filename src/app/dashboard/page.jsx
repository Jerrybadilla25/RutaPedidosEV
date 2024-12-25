import React from 'react'
import {Suspense} from 'react'
//import Home from '@/components/home'
import {connectDB} from '@/utils/dbserver'
import TablaPedido from '@/app/dashboard/tablePedido'
import Filtros from '@/app/dashboard/fitros'
import {getDataPedidos} from '@/app/dashboard/action'


export default async function Homepage() {
  connectDB()
  const pedidos = await getDataPedidos()
  return (
    <Suspense  fallback={<p>Cargando pedidos...</p>} >
      <Filtros/>
      {
        pedidos.map((pedido)=>(
          <TablaPedido key={pedido._id} pedido={pedido}/>
        ))
      }
      
    </Suspense>
  );
}