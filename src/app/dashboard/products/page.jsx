import TableProduts from '@/app/dashboard/products/tableProduts'
import {Suspense} from 'react'
import Cargando from '@/components/cargando'
import {getUser} from '@/utils/dal'
import { redirect } from 'next/navigation'
import Products from '@/model/Product'

export default async function AllProducts() {
    const user = await getUser()
    console.log(user)
    if(!user.user){
        redirect('/')
    }
    const data = 1
    const productos = await Products.find()
  return (
    <div>
      <Suspense key={data} fallback={<Cargando/>}>
        <TableProduts productos={productos}/>
    </Suspense>  
    </div>
    

  )
}
