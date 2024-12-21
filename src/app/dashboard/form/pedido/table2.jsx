'use client'
import { useActionState, useFormStatus } from "react";
import {addPedidotBd} from '@/app/dashboard/form/pedido/actions'

export default function Table2({products, id}) {
    const [state, formAction, pending] = useActionState(addPedidotBd, undefined);
    
  return (
    <form action={formAction} className="form-box">
          <table className="table-per">
            <thead>
              <tr className="table-header">
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Solicitud</th>
              </tr>
            </thead>
            <tbody>
              {products.map((itm) => (
                <tr key={itm._id} className="table-row">
                  <td>
                    <input
                      type="text"
                      name="sku"
                      className="input-field"
                      value={itm.productId}
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-field"
                      value={itm.name}
                      name="nombre"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-field"
                      value={itm.category}
                      name="category"
                      readOnly
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      className="input-field"
                      value={itm.price}
                      name="price"
                      readOnly
                    />
                  </td>
                  <td>
                    <input type="text" className="input-per" name="cantidad" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <input type="text" name="idCliente" defaultValue={id} className="display-none" />
          <button className="button-full">Guardar pedido</button>
        </form>
  )
}
