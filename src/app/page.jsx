import Link from "next/link";
//import { cookies } from "next/headers";
import { GrLogin } from "react-icons/gr";
import BotonLogOut from "@/components/botonLogOut";
//import Register from "@/components/botonRegister";
import BarraMaster from "@/components/barraMaster";
import { getUser } from "@/utils/dal";
import User from "@/model/User";
import Cliente from "@/model/Cliente";
import data from '../components/clientes.json'

export default async function Homepage() {
  //const cookie = (await cookies()).get("session")?.value;


  async function addMasive() {
    for (let ele of data) {
      let newCliente = new Cliente({
        name: ele.name,
        clientId: ele.clientId,
        zona: ele.agente,
        desc: ele.desc,
        typePay: ele.typePay,   
      });

      try {
        await newCliente.save();
        console.log(`Cliente ${ele.name} guardado correctamente.`);
      } catch (error) {
        console.error(`Error al guardar el cliente ${ele.name}:`, error);
      }
    }
  }

  //addMasive();


  async function deleteClientes (){
    const clientes = await Cliente.find()
    for (let ele of clientes){
      await Cliente.findOneAndDelete(ele._id)
      console.log(`Cliente ${ele.name} eliminado.`)
    }
  }

  //deleteClientes()

  const user = await getUser();
  let role = null;
  if (user) {
    role = user.role;
  }
  let users = await User.find().select("-password -fecha").lean();
  users = JSON.parse(JSON.stringify(users));

  return (
    <div className="container-100">
      <header className="flex-row justify-between align-center altura-header ">
        <div className="logo-principal">
          {user ? (
            <Link href="/dashboard" className="text-white">
              Mi Aplicacion
            </Link>
          ) : (
            <div>Logo</div>
          )}
        </div>

        {!user ? (
          <nav className="nav-container">
            <Link href="/login" className="nav-item">
              <span>
                <GrLogin />
              </span>
              <p>Login</p>
            </Link>
          </nav>
        ) : (
          <div className="">
            <BotonLogOut />
          </div>
        )}
      </header>
      {role === "master" && <BarraMaster users={users} />}
    </div>
  );
}
