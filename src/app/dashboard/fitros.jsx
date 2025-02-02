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
import RangoFecha from "@/app/dashboard/component/rangoFecha";

//import {handleIconClick} from '@/app/dashboard/action'

const FilterBar = ({ filtro, numberAncla }) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  // Obtener el almacenamiento local
  const handleIconClick = (filtroName) => {
    try {
      const params = new URLSearchParams(searchParams);
      if (filtroName) {
        params.set("filter", filtroName);
      } else {
        params.delete("filter");
        params.delete("ancla");
        params.delete("searchid");
        params.delete("idPed");
      }
      replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.error("Error en handleIconClick:", error);
    }
  };

  const handleIconClean = () => {
    try {
      const params = new URLSearchParams(searchParams);
      params.delete("filter");
      params.delete("ancla");
      params.delete("searchid");
      params.delete("idPed");
      replace(`${pathname}?${params.toString()}`);
    } catch (error) {
      console.error("Error en handleIconClean:", error);
    }
  };

  function cleanAncla() {
    try {
      localStorage.clear();
    } catch (error) {
      console.error("Error al limpiar localStorage:", error);
    }
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
    //{ name: "Usuarios", icon: <FaUser /> },
    //{ name: "A-Z", icon: <GrDescend /> },
    //{ name: "Z-A", icon: <GrAscend /> },
    {
      name: "Limpiar",
      icon: <MdOutlineFilterAltOff />,
      action: () => handleIconClean(),
    },
  ];

  return (
    <div className="filter-bar ">
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
        className={numberAncla === 3 ? "filter-item-focus" : "filter-item"}
        onClick={clerAncla.action}
      >
        <div className="filter-icon">{clerAncla.icon}</div>
        <span
          className={numberAncla === 3 ? "filter-name-focus" : "filter-name"}
        >
          {clearAncla.name}
        </span>
      </div>
      <RangoFecha />
    </div>
  );
};

export default FilterBar;
