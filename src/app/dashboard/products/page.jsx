export const dynamic = "force-dynamic";
import TableProduts from "@/app/dashboard/products/tableProduts";
import { Suspense } from "react";
import Cargando from "@/components/cargando";
import { getUser } from "@/utils/dal";
import { redirect } from "next/navigation";
import Products from "@/model/Product";
import "./local.css";

export default async function AllProducts({ searchParams }) {
  const user = await getUser();
  if (!user.user) {
    redirect("/");
  }

  const datos = await searchParams;
  const query = datos?.query?.trim() || ""; // .trim() para eliminar espacios en blanco
  const data = 1;
  let productos = [];

  if (query) {
    const productosFilter = await Products.find();

    const filterproducts = productosFilter.filter((producto) => {
      // Verifica que el producto y su descripción existan
      if (!producto || !producto.description) return false;

      // Búsqueda case-insensitive
      return producto.description.toLowerCase().includes(query.toLowerCase());
    });

    productos = filterproducts;
  } else {
    productos = await Products.find();
  }

  return (
    <Suspense key={data} fallback={<Cargando />}>
      <TableProduts productos={productos} />
    </Suspense>
  );
}
