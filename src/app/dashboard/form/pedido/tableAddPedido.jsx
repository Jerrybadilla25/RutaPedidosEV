import Table from '@/app/dashboard/form/pedido/table2'
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
        <Table products={products} id={clientId._id} />
      </div>
    </div>
  );
}
