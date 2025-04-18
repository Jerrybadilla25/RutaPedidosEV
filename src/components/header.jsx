import BotonLogOut from "@/components/botonLogOut";
import BotonRegister from "@/components/botonRegister";
import {getUser} from '@/utils/dal'
import ThemeToogle from '@/app/ThemeToggle'

export default async function Header({role}) {
  const data = await getUser()
  const user = data.user || ""
  const roll = data.role || ""
  
  return (
    <div className="flex-row justify-between header text-white">
      <h1 className="bold roboto">Header</h1>
      <div className="flex-row justify-flex-end">
        <span className="roboto-sm bold">{user}   :</span>
        
        <span className="roboto-sm bold mx-1">rol</span>
        <span className="roboto-sm bold text-succes">{roll}</span>
      </div>
      
      <div className="flex-row gap-small">
        <BotonLogOut />
        {
            (role==='master') && (
                <BotonRegister />
            )
        }
        <ThemeToogle/>
      </div>
    </div>
  );
}
