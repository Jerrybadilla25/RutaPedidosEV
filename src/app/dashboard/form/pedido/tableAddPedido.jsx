import "./local.pedido.css";



export default function tableAddPedido({ clientId, products }) {
  return (
    <div className="container-ped">
  <div>
    <h1 className="title">Datos del Cliente</h1>
  </div>
  <div>
    <div className="flex-container">
      <h5>Nombre comercio</h5>
      <p>{clientId.name}</p>
      <h5>Email</h5>
      <p>{clientId.email}</p>
    </div>
    <div className="flex-container">
      <h5>Contacto</h5>
      <p>{clientId.contact}</p>
      <h5>Teléfono</h5>
      <p>{clientId.cel}</p>
    </div>
  </div>
  <div>
    <form className="form-box">
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
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input-field"
                  value={itm.category}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input-field"
                  value={itm.price}
                  readOnly
                />
              </td>
              <td>
                <input
                  type="text"
                  className="input-per"
                  name="cantidad"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="button-full">Guardar pedido</button>
    </form>
  </div>
</div>

  
  );
}
