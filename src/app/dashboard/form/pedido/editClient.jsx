"use client";
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function EditClient({ ids }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  console.log(pathname)
  const { replace } = useRouter();

  const handleSearchId = (id) => {
    const params = new URLSearchParams(searchParams);
    let dirr = '/dashboard/form/cliente'
    params.set("delCli", id);
    replace(`${dirr}?${params.toString()}`);
  };
  return <div 
  onClick={() => handleSearchId(ids)}
  className="editClient"
  >Editar cliente</div>;
}
