"use client";
// FilterBar.jsx
import React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaFilter, FaSearch, FaUser, FaCheck } from "react-icons/fa";
import { GrDescend, GrAscend } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineCancel, MdOutlineFilterAltOff } from "react-icons/md";
import { PiInvoiceFill } from "react-icons/pi";
//import {handleIconClick} from '@/app/dashboard/action'

const FilterBar = ({filtro}) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleIconClick = (filtroName) => {
    const params = new URLSearchParams(searchParams);
    if (filtroName) {
      params.set("filter", filtroName);
    } else {
      params.delete("filter");
      //params.delete("searchid");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleIconClean = (filtroName) => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    replace(`${pathname}?${params.toString()}`);
  };

  const filters = [
    {
      name: "pending",
      icon: <FaCheck />,
      action: () => handleIconClick("pending"),
    },
    {
      name: "shipped",
      icon: <LiaShippingFastSolid />,
      action: () => handleIconClick("shipped"),
    },
    {
      name: "cancelled",
      icon: <MdOutlineCancel />,
      action: () => handleIconClick("cancelled"),
    },
    {
      name: "delivered",
      icon: <PiInvoiceFill />,
      action: () => handleIconClick("delivered"),
    },
    { name: "Usuarios", icon: <FaUser /> },
    //{ name: "Buscar", icon: <FaSearch /> },
    { name: "Z-A", icon: <GrDescend /> },
    { name: "A-Z", icon: <GrAscend /> },
    { name: "Usuarios", icon: <FaUser /> },
    {
      name: "Limpiar",
      icon: <MdOutlineFilterAltOff />,
      action: () => handleIconClean("quitar"),
    },
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter, index) => (
        <div
          key={index}
          className={
            filter.name===filtro ? 'filter-item-focus': 'filter-item'
          }
          onClick={filter.action} // Maneja el clic en el filtro
        >
          <div className="filter-icon">{filter.icon}</div>
          <span className="filter-name">{filter.name}</span>
        </div>
      ))}
    </div>
  );
};

export default FilterBar;