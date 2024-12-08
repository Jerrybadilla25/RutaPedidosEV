import Link from 'next/link'
import { cookies } from "next/headers";


export default async  function Homepage() {
  const cookie = (await cookies()).get("session")?.value;
   
  return (
    <div className="grid grid-rows">
      <header className="bg-gray-800 text-white shadow">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
    
    <div className="text-2xl font-bold">
      {
        cookie ? <Link href="/dasboard" className="hover:text-gray-300">Mi Aplicacion</Link> :
        <div>Logo</div>
      }
    
    </div>
    
    
    <nav className="flex items-center space-x-6">
      <Link href="/login" className="text-sm font-medium hover:text-gray-300">Login</Link>
      
      <Link href="/register" className="text-sm font-medium hover:text-gray-300">Register</Link>
    </nav>
  </div>
</header>

    </div>
  );
}
