import {verifySession} from '@/utils/dal'
import {redirect} from 'next/navigation'
import {deleteSession} from '@/utils/session'

export default async function page() {
  let seccion = await verifySession()  
  if(!seccion){
    redirect('/singin')
  }
  await deleteSession()
    redirect('/singin')
}
