export const dynamic = 'force-dynamic';
import Search from '@/app/dashboard/form/editpedido/search';
import Form from '@/app/dashboard/form/editpedido/form';
import { Suspense } from "react";
import './local.css';
import { editPedido } from '@/app/dashboard/form/editpedido/actions';
import { getUser } from '@/utils/dal';
import Products from '@/model/Product'

export default async function EditPedido({ searchParams }) { 
  const data = await searchParams;
  const query = data?.query || "";
  const dell = data?.del || ""; //del es id a modificar//
  const cant = data?.cant || ""; // cantidad a cambiar//
  const dele = data?.dele || ""; // cantidad a cambiar//
  const qty = data?.qty || ""; // cantidad a cambiar//
  const add = data?.add || ""; // cantidad a cambiar//
  


  const usuario = await getUser();
  const user= usuario.user
  const Idpedido = await editPedido(query, dell, cant, dele, qty, add, user); 
  
  const productos = await Products.find()
  

  if (Idpedido === null) {
    return (
      <div>
        <Search />
        <h5>Pedido no encontrado</h5>
      </div>
    );
  }

  const safePedidos = JSON.parse(JSON.stringify(Idpedido));
  const safeProducts = JSON.parse(JSON.stringify(productos));

  if((usuario.user === Idpedido.vendedor || usuario.role === "picker") && (Idpedido.status === "pendiente" || Idpedido.status === "aprobado")){
    return (
      <div>
        <Search />
        <Suspense fallback={<div>Cargando...</div>}>
          <Form pedido={safePedidos} products={safeProducts} />
        </Suspense>
      </div>
    );
  }

  return (
    <div>
    <Search />
    <h5 className='roboto'>No tiene permiso para editar este pedido, porque el status es
      <span className='nameTitle bold font-xl mx-1'>   {Idpedido.status}</span>
       </h5>
  </div>
);
}