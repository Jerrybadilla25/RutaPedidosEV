"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import {useDebouncedCallback} from 'use-debounce'

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();


  const handleSearch = useDebouncedCallback ((e) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      params.set("query", e);
    } else {
      params.delete("query");
      params.delete("searchid");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  
  return (
    <div className="flex-row justify-center mb-1">
      <div className="search">
        <h4 className="searchTitle">Buscar cliente</h4>
      </div>
      
      {/* Contenedor del input de búsqueda */}
      <div className="search">
        <input
          size="50"
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          defaultValue={searchParams.get("query")?.toString()}
          name="search"
          placeholder="Escriba aqui..."
          className="searchInput"
        />
      </div>
    </div>
  );
}
