'use client'
import React from 'react'
import { useSearchParams, usePathname, useRouter } from "next/navigation";


export default function SelectClient({ids}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
 


  const handleSearchId =  (id) => {
    const params = new URLSearchParams(searchParams);
    params.set("searchid", id);
    replace(`${pathname}?${params.toString()}`)
    };

  return (
    <input
    className='buton-per'
    onClick={()=>handleSearchId(ids)}
    name="select"
    placeholder='Seleccionar'
    />
  )
}