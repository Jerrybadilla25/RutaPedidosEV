import React from 'react'

export default function SqueletonTable() {
  return (
    <div className="pedido">
    <form className='text-white'>
      <div className="pedido-col">
        <div className="pedido-sub">
          <p className="w-1 font-sl">Fecha:</p>
          <p className="w-1 font-sx skeleton skeleton-text"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-1 font-sl">ID Pedido:</p>
          <p className="w-1 font-sx skeleton skeleton-text"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-4 font-sl">Cliente:</p>
          <p className="w-4 font-sx skeleton skeleton-text"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-1 font-sl">Teléfono:</p>
          <p className="w-1 font-sx skeleton skeleton-text"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-2 font-sl">Total:</p>
          <p className="w-2 font-sx skeleton skeleton-text"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-3 font-sl">Status:</p>
          <p className="w-3 font-sx skeleton skeleton-select"></p>
        </div>
        <div className="pedido-sub">
          <p className="w-1 font-sl skeleton skeleton-button"></p>
          <p className="w-1 font-sx skeleton skeleton-text"></p>
        </div>
      </div>
      <div className="pedido-col">
        <p className="font-sx">
          <strong>Dirección de Envío:</strong> 
          <span className="skeleton skeleton-text"></span>
        </p>
      </div>
      <div className="pedido-col">
        <div className="barra-progreso skeleton"></div>
      </div>
      <div className="pedido-col">
        <p className="font-sl skeleton skeleton-button"></p>
        <p className="font-sl skeleton skeleton-button"></p>
      </div>
    </form>
  </div>
  


  )
}
