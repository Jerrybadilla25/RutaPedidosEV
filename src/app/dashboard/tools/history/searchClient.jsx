"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";
import RangoFecha from '@/app/dashboard/component/rangoFecha'
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // Se usa para retrasar milisegundos

export default function SearchClient() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Usamos debounce para retrasar la actualización de la URL
  const debouncedSearch = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set("history", value);
    } else {
      params.delete("history");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300); // Retraso de 300ms (ajusta según sea necesario)

  return (
    <div className="box-search">
      <div className="flex-row justify-around">
      <div>
        <RangoFecha/>
      </div>
      <div className="flex-row gap-medium search-box-history">
        <div className="icon-search">
          <FiSearch />
        </div>

        <input
          type="text"
          placeholder="Buscar cliente..."
          onChange={(e) => debouncedSearch(e.target.value)}
          defaultValue={searchParams.get("history")?.toString()}
          name="historia"
        />
      </div>
    </div>
    </div>
  );
}
