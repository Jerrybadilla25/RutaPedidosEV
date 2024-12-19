//import "../../globals.css";
//import "../../dashboard/local.css";

export default function TableProducts({ productos }) {
  return (
    <div className="table-per">
      <table >
      <thead>
      <tr className="table-tr">
        <th>Id</th>
        <th>Producto</th>
        <th>Descripcion</th>
        <th>Categoria</th>
        <th>Precio</th>
      </tr>
      </thead>
      <tbody>
      {productos.map((itm) => (
        <tr className="table-per-td" key={itm._id}>
          <td>{itm.productId}</td>
          <td>{itm.name}</td>
          <td>{itm.description}</td>
          <td>{itm.category}</td>
          <td>{itm.price}</td>
        </tr>
      ))}
      </tbody>
    </table>
    </div>
  );
}

/*

 <div>
      {
      productos.map((itm)=>(
        <div key={itm._id}>
          <p>{itm.productId}</p>
          <p>{itm.name}</p>
          <p>{itm.description}</p>
          <p>{itm.price}</p>
          <p>{itm.category}</p>
          <p>{itm.stock}</p>

        </div>
      ))
    }
    </div>
*/
