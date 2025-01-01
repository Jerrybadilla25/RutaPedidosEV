"use client";
// FilterBar.jsx
import React from "react";
//import { useState, useEffect } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { FaFilter, FaSearch, FaUser, FaCheck } from "react-icons/fa";
import { GrDescend, GrAscend } from "react-icons/gr";
import { LiaShippingFastSolid } from "react-icons/lia";
import { MdOutlineCancel, MdOutlineFilterAltOff } from "react-icons/md";
import { PiInvoiceFill } from "react-icons/pi";
import { FaAnchorCircleXmark } from "react-icons/fa6";
//import {handleIconClick} from '@/app/dashboard/action'

const FilterBar = ({ filtro, numberAncla }) => {
  console.log({ numberAncla });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Obtener el almacenamiento local

  const handleIconClick = (filtroName) => {
    const params = new URLSearchParams(searchParams);
    if (filtroName) {
      params.set("filter", filtroName);
    } else {
      params.delete("filter");
      params.delete("ancla");
      params.delete("searchid");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const handleIconClean = (filtroName) => {
    const params = new URLSearchParams(searchParams);
    params.delete("filter");
    params.delete("ancla");
    params.delete("searchid");
    replace(`${pathname}?${params.toString()}`);
  };

  function cleanAncla() {
    localStorage.clear();
  }
  const clearAncla = {
    name: "vaciar",
    icon: <FaAnchorCircleXmark />,
    action: () => cleanAncla(),
  };

  const clerAncla = {
    name: "vaciar",
    icon: <FaAnchorCircleXmark />,
    action: () => cleanAncla(),
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
    { name: "A-Z", icon: <GrDescend /> },
    { name: "Z-A", icon: <GrAscend /> },
    { name: "Usuarios", icon: <FaUser /> },
    {
      name: "Limpiar",
      icon: <MdOutlineFilterAltOff />,
      action: () => handleIconClean("vaciar"),
    },
  ];

  return (
    <div className="filter-bar">
      {filters.map((filter, index) => (
        <div
          key={index}
          className={
            filter.name === filtro ? "filter-item-focus" : "filter-item"
          }
          onClick={filter.action} // Maneja el clic en el filtro
        >
          <div className="filter-icon">{filter.icon}</div>
          <span
            className={
              filter.name === filtro ? "filter-name-focus" : "filter-name"
            }
          >
            {filter.name}
          </span>
        </div>
      ))}
      <div 
        className={
          numberAncla === 3 ? "filter-item-focus" : "filter-item"
        }
        onClick={clerAncla.action}
        >
        <div
          className= "filter-icon"
        >
          {clerAncla.icon}
        </div>
        <span
          className={numberAncla === 3 ? "filter-name-focus" : "filter-name"}
        >
          {clearAncla.name}
        </span>
      </div>
    </div>
  );
};

export default FilterBar;
