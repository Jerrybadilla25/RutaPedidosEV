"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleSearch = (e) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      params.set("query", e);
    } else {
      params.delete("query");
    }
    replace(`${pathname}?${params.toString()}`);
  };
  
  return (
    <div>
      <h4>Buscar cliente</h4>
      {/* Contenedor del input de búsqueda */}
      <div className="mb-4 flex flex-row justify-between">
        <input
          onChange={(e) => handleSearch(e.target.value)}
          type="text"
          defaultValue={searchParams.get("query")?.toString()}
          name="search"
          placeholder="Buscar..."
          className="w-full text-slate-950 p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focu<SelectCliente/>s:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>
  );
}
