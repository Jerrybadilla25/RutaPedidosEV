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
  


  
  const Idpedido = await editPedido(query, dell, cant, dele, qty, add); 
  const usuario = await getUser();
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

  if (usuario.user !== Idpedido.vendedor || Idpedido.status!=="pending") {
    return (
      <div>
        <Search />
        <h5>No tiene permiso para editar este pedido</h5>
      </div>
    );
  }

  return (
    <div>
      <Search />
      <Suspense fallback={<div>Cargando...</div>}>
        <Form pedido={safePedidos} products={safeProducts} />
      </Suspense>
    </div>
  );
}