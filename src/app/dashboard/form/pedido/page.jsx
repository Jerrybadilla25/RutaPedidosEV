
import TablaCliente from '@/app/dashboard/form/pedido/tableCliente'
import TableAddPedido from '@/app/dashboard/form/pedido/tableAddPedido'
import Cargando from '@/components/cargando'
import Search from '@/app/dashboard/form/pedido/search'
import {Suspense} from 'react'
import Cliente from '@/model/Cliente'
import Productos from '@/model/Product'
import '../pedido/local.pedido.css'


export default async function FormPedidoCliente({ searchParams }) {
  const data = await searchParams
  const query = data?.query || ""
  const seachid = data?.searchid || ""
  if(seachid){
    const clientId = await Cliente.findById(seachid).lean()
    const products = await Productos.find()
    

    return(
      <div className="p-4">
        <Search/>
        <div>
          <Suspense key={seachid}>
            <TableAddPedido
            clientId={clientId}
            products={products}
            />
          </Suspense>
        </div>
        
      </div>
      
    )
  }
  
  return (
    <div className="p-4">
      
      <Search/>
      {/* Contenedor de la tarjeta */}
      <div>
        <Suspense key={query} fallback={<Cargando/>} >
          <TablaCliente query={query} />
        </Suspense>
        
      </div>

    </div>
  )
}


