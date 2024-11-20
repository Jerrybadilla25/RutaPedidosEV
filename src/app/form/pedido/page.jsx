
import TablaCliente from '@/components/tableCliente'
import Cargando from '@/components/cargando'
import Search from '@/components/search'
import {Suspense} from 'react'


export default async function FormPedidoCliente({ searchParams }) {
  const data = await searchParams
  const query = data?.query || "";
  
  
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


