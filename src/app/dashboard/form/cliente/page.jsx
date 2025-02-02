export const dynamic = "force-dynamic";
// import '../local.css'

import FormClienteAdd from "@/app/dashboard/form/cliente/form";
import Cliente from "@/model/Cliente";

export default async function CreateCliente({ searchParams }) {
  const { delCli } = await searchParams; // Extraemos delCli directamente

  

  if (delCli) {
    let cliente = null; // Definimos cliente como null por defecto
    cliente = JSON.parse(JSON.stringify(await Cliente.findById(delCli)));
    return <FormClienteAdd cliente={cliente} />;
  }

  return <FormClienteAdd />;
}

