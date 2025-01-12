//import { deleteSession } from "@/components/actions/deleteSescion";
import {deleteSession} from '@/utils/session'

export default function LogoutButton() {
  return (
    <form action={deleteSession}>
      <button
        type="submit"
        className='btn-out'
      >
        Logout
      </button>
    </form>
  );
}

