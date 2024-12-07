import Link from 'next/link'
import {getUser} from '@/utils/dal'


export default   function Homepage() {
   //const user = getUser()
   //console.log(user)
  

  return (
    <div className="grid grid-rows">
      <header className="bg-gray-800 text-white shadow">
  <div className="container mx-auto flex justify-between items-center py-4 px-6">
    
    <div className="text-2xl font-bold">
    <Link href="/dasboard" className="hover:text-gray-300">Mi Aplicacion</Link>
    </div>
    
    
    <nav className="flex items-center space-x-6">
      <Link href="/singin" className="text-sm font-medium hover:text-gray-300">Login</Link>
      
      <Link href="/signup" className="text-sm font-medium hover:text-gray-300">Register</Link>
    </nav>
  </div>
</header>

    </div>
  );
}
