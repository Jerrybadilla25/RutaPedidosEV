"use client";

import React, { useState } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const DateInput = () => {
  const [dates, setDates] = useState({
    dataIn: "",
    dataOut: "",
  });

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const filterParams = new URLSearchParams(searchParams);
  

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);
    if (dates.dataIn!=="" & dates.dataOut!=="") {
      const encodedArray = encodeURIComponent(JSON.stringify(dates));
      params.set("filterRango", encodedArray);
    } else {
      params.delete("filter");
      params.delete("ancla");
      params.delete("searchid");
      params.delete("filterRango");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const cleanFilterRango = ()=>{
    const params = new URLSearchParams(searchParams);
    setDates({
      dataIn: "",
      dataOut: "",
    })
    params.delete("filterRango");
    replace(`${pathname}?${params.toString()}`);
  }

  const handleInputChange1 = (e) => {
    const { name, value } = e.target;
    setDates((prevDates) => ({
      ...prevDates,
      [name]: value,
    }));
  };

  return (
    <div className="flex-row box-rango">
      <div className="flex-column">
        <div className="flex-row mb-0">
          <span className="textDate text-white">De</span>
          <input
            type="date"
            name="dataIn"
            value={dates.dataIn}
            onChange={handleInputChange1}
            className="text-white"
          />
        </div>
        <div className="flex-row">
          <span className="textDate text-white">A</span>
          <input
            type="date"
            name="dataOut"
            value={dates.dataOut}
            onChange={handleInputChange1}
            className="text-white"
          />
        </div>
      </div>

      <div className="">
        {
          !filterParams.has('filterRango')? <button onClick={handleClick} className="btn-rango-1">
          Aplicar
        </button>: <button onClick={cleanFilterRango} className="btn-rango-1">
          Eliminar
        </button>
        }
        
      </div>
    </div>
  );
};

export default DateInput;


