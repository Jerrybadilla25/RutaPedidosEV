
import Search from '@/app/dashboard/form/editpedido/search'
import Form from '@/app/dashboard/form/editpedido/form'
import { Suspense } from "react";
import './local.css'
import {editPedido} from '@/app/dashboard/form/editpedido/actions'

export default async function EditPedido({ searchParams }) {
  const data = await searchParams;
  const query = data?.query || "";
  const pedido = await editPedido(query)
  
  

  return (
    <div>
      <Search/>
      <Suspense >
        {
          (pedido !== null)&&(
            <Form pedido={pedido}/>
          )
        }
      </Suspense>
    </div>
  )
}
