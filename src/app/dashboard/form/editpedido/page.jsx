
import Search from '@/app/dashboard/form/editpedido/search';
import Form from '@/app/dashboard/form/editpedido/form';
import { Suspense } from "react";
import './local.css';
import { editPedido } from '@/app/dashboard/form/editpedido/actions';
import { getUser } from '@/utils/dal';

export default async function EditPedido({ searchParams }) {
  const query = searchParams?.query || "";
  const Idpedido = await editPedido(query);
  const usuario = await getUser();

  console.log(usuario);
  console.log(Idpedido);

  if (!Idpedido) {
    return (
      <div>
        <Search />
        <h5>Pedido no encontrado</h5>
      </div>
    );
  }

  if (usuario.user !== Idpedido.vendedor) {
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
        <Form pedido={Idpedido} />
      </Suspense>
    </div>
  );
}