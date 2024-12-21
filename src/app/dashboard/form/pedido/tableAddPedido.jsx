import Table from '@/app/dashboard/form/pedido/table2'
export default function tableAddPedido({ clientId, products }) {
  return (
    <div className="container-ped">
      <div>
        <h1 className="title">Datos del Cliente</h1>
      </div>

         <div className="container-data-cliente">
                <div className="">
                  <div className="flex-justify-between text-orange">
                    <div className="">
                      <p className=" ">Nombre del comercio</p>
                      <span className="text-per-white bolt-per font-per-sl">
                        {clientId.name}
                      </span>
                    </div>
                    <div className="">
                      <p className="">Contacto</p>
                      <span className="text-per-white bolt-per font-per-sl">
                        {clientId.contact}
                      </span>
                    </div>
                    <div>
                      <p className="">Tel contacto</p>
                      <span className="text-per-white bolt-per font-per-sl">
                        {clientId.cel}
                      </span>
                    </div>
                    <div>
                      <p className=" ">Email contacto</p>
                      <span className="text-per-white bolt-per font-per-sl">
                        {clientId.email}
                      </span>
                    </div>
                  </div>
    
                  <div className="">
                    <div className="border-top"></div>
    
                    <div className="flex-justify-between  ">
                      <div>
                        <p className="">Direccion del cliente</p>
                      </div>
                      <div className="text-per-white">
                        
                          <p>
                            <span className="text-per-white">
                              {clientId.address.provincia}, {clientId.address.canton},{" "}
                              {clientId.address.distrito} <br />
                            </span>
                            <span className="text-per-white">
                              {clientId.address.direccion}
                            </span>
                          </p>
                        
                      </div>
                    </div>
                  </div>
                  
                  
                  
                </div>
                
              </div>



      <div>
        <Table products={products} id={clientId._id} />
      </div>
    </div>
  );
}

/*
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
          <p>{clientId.cel}</p>mx-5 py-
        </div>
      </div>
      */