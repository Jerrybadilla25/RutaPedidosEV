"use client";
import React, {useState} from "react";
import { FiSearch } from "react-icons/fi";
import RangoFecha from "@/app/dashboard/component/rangoFecha";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useDebouncedCallback } from "use-debounce"; // Se usa para retrasar milisegundos


export default function SearchClient() {
  const [selectedOption, setSelectedOption] = useState("pedido"); // Estado para la opción seleccionada
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

  const handleChange = (event) => {
    const value = event.target.value;
    const params = new URLSearchParams(searchParams);
    if (selectedOption === value) {
      setSelectedOption("");
      params.delete("radio");
    } else {
      setSelectedOption(value);
      params.set("radio", value);
    }
    replace(`${pathname}?${params.toString()}`);
  };
  

  return (
    <div className="box-search">
      <div className="flex-row justify-around">
        <div>
          <RangoFecha />
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
        <div className="flex-column font-sm gap-small">
          <div className="flex-row  input-radio">
            <input  
            type="radio"
            name="opcion"
            value="pedido"
            id="pedido"
            onChange={handleChange}
            checked={selectedOption === "pedido"}
            />
            Pedidos
          </div>
          <div className="flex-row input-radio">
            <input 
             type="radio"
             name="opcion"
             value="codigos"
             id="codigos"
             onChange={handleChange}
             checked={selectedOption === "codigos"}
            /> Codigos
          </div>
        </div>
      </div>
    </div>
  );
}
