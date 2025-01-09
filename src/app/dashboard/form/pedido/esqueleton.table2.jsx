import React from 'react'

export default function Esqueleton() {
  return (
    <table className="table-per">
  <colgroup>
    <col style={{ width: "10%" }} />
    <col style={{ width: "25%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "10%" }} />
    <col style={{ width: "25%" }} />
    <col style={{ width: "20%" }} />
  </colgroup>
  <thead>
    <tr className="table-header">
      <th>Código</th>
      <th>Nombre</th>
      <th>Categoría</th>
      <th>Precio</th>
      <th>Solicitud</th>
      <th>Sub total</th>
    </tr>
  </thead>
  <tbody>
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-input"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
    </tr>
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-input"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
    </tr>
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-input"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
    </tr>
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-input"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
    </tr>
    <tr className="skeleton-row">
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
      <td><div className="skeleton skeleton-input"></div></td>
      <td><div className="skeleton skeleton-text"></div></td>
    </tr>
  </tbody>
</table>

  )
}
