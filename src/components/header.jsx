import BotonLogOut from "@/components/botonLogOut";
import BotonRegister from "@/components/botonRegister";
import {getUser} from '@/utils/dal'

export default async function Header({role}) {
  const data = await getUser()
  const user = data.user || ""
  const roll = data.role || ""
  console.log(data)
  return (
    <div className="flex-row justify-between  header">
      <h1>Header</h1>
      <div className="flex-row justify-flex-end">
        <span className="font-sl">{user}   :</span>
        
        <span className="font-sl mx-1">rol</span>
        <span className="font-sl text-succes">{role}</span>
      </div>
      <div className="flex-row">
        <BotonLogOut />
        {
            (role==='master') && (
                <BotonRegister />
            )
        }
      </div>
    </div>
  );
}
