import BotonLogOut from "@/components/botonLogOut";
import BotonRegister from "@/components/botonRegister";

export default function Header({role}) {
  return (
    <div className="flex-row justify-between  header">
      <h1>Header</h1>
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
