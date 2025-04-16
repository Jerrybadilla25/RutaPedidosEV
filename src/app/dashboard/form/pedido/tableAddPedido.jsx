import Table from "@/app/dashboard/form/pedido/table2";
import Squeleton from '@/app/dashboard/form/pedido/esqueleton.table2'
export default function tableAddPedido({ clientId, products }) {
  return (
    <div className="container-100 ">
      
      <div className="container-head-cliente box-1">
      <div>
        <h1 className=" text-white">Datos del Cliente</h1>
      </div>
        <div className="flex-row justify-flex-start gap-large  mb-2 box-line ">
          <div className="">
            <p className="nameTitle ">Nombre del comercio</p>
            <span className="nameDescripcion">{clientId.name}</span>
          </div>
          <div className="">
            <p className="nameTitle">Contacto</p>
            <span className="nameDescripcion">{clientId.contact}</span>
          </div>
          <div>
            <p className="nameTitle">Tel contacto</p>
            <span className="nameDescripcion">{clientId.cel}</span>
          </div>
          <div>
            <p className="nameTitle ">Email contacto</p>
            <span className="nameDescripcion">{clientId.email}</span>
          </div>
          <div>
            <p className="nameTitle ">Descuento</p>
            <span className="nameDescripcion">{clientId.desc} %</span>
          </div>
          <div>
            <p className="nameTitle ">Tipo Cliente</p>
            <span className="nameDescripcion">{clientId.typePay}</span>
          </div>
        </div>
        <div className="flex-row justify-flex-start mb-2">
        <div>
          <p className="nameTitle">Direccion</p>
          <p >
            <span className="text-white">
            {clientId.address.provincia} {clientId.address.canton} {clientId.address.distrito} <br />
            </span>
            <span className="nameDescripcion">{clientId.address.direccion}</span>
          </p>
        </div>
        <div>
          
        </div>
      </div>
      <div className="flex-row box-line">
        {
          products ? <Table products={products} id={clientId._id} desc={clientId.desc}  />: <Squeleton/>
        }
        
      </div>
      </div>
      

      
    </div>
  );
}


