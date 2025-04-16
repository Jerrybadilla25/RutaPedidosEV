"use client";
import React from "react";

export default function Pption({ statusBol, rol, status, handleChange }) {
  return (
    <div className="pedido-radio-options">
      <div className="radio-group">
        {rol === "approver" && status === "pendiente" && (
          <>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="aprobado"
                onChange={handleChange}
              />
              Aprobado
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="rechazado"
                onChange={handleChange}
              />
              Rechazado
            </label>
          </>
        )}

        {rol === "seller" &&
          (status === "pendiente" || status === "rechazado") && (
            <>
              {status === "pendiente" && (
                <label className="radio-option">
                  <input
                    type="radio"
                    name="status"
                    value="cancelado"
                    onChange={handleChange}
                  />
                  Cancelado
                </label>
              )}
              {status === "rechazado" && (
                <label className="radio-option">
                  <input
                    type="radio"
                    name="status"
                    value="pendiente"
                    onChange={handleChange}
                  />
                  Reapertura
                </label>
              )}
            </>
          )}

        {rol === "picker" && status === "aprobado" && (
          <label className="radio-option">
            <input
              type="radio"
              name="status"
              value="alistado"
              onChange={handleChange}
            />
            Alistado
          </label>
        )}

        {rol === "invoicer" && status === "alistado" && (
          <label className="radio-option">
            <input
              type="radio"
              name="status"
              value="facturado"
              onChange={handleChange}
            />
            Facturado
          </label>
        )}

        {rol === "shipper" && status === "facturado" && (
          <label className="radio-option">
            <input
              type="radio"
              name="status"
              value="enviado"
              onChange={handleChange}
            />
            Enviado
          </label>
        )}

        {rol === "master" && (
          <>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="pendiente"
                onChange={handleChange}
                //checked={status === "pendiente"}
              />
              Pendiente
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="aprobado"
                onChange={handleChange}
                //checked={status === "aprobado"}
              />
              Aprobado
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="alistado"
                onChange={handleChange}
                //checked={status === "alistado"}
              />
              Alistado
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="facturado"
                onChange={handleChange}
                //checked={status === "facturado"}
              />
              Facturado
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="enviado"
                onChange={handleChange}
                //checked={status === "enviado"}
              />
              Enviado
            </label>
            <label className="radio-option">
              <input
                type="radio"
                name="status"
                value="cancelado"
                onChange={handleChange}
                //checked={status === "cancelado"}
              />
              Cancelado
            </label>
          </>
        )}
      </div>
    </div>
  );
}
