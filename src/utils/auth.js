import User from "@/model/User"
import { connectDB } from "@/utils/dbserver"
import bcrypt from "bcryptjs"
import {createSession} from '@/utils/session'
//import { cookies } from 'next/headers'
import { deleteSession } from '@/utils/session'

//import { SignupFormSchema } from "@/utils/definiciones"

export async function validateUser(emailUser, passwordUser) {
  try {
    connectDB();
    if (!emailUser && !passwordUser) {
      return {
        message: "campos en blanco",
      };
    }
    const UserId = await User.find({ email: emailUser });
    if (UserId.length===0) {
      return {
        message: "Email invalido",
      };
    }
    let hashedPaswword = UserId[0].password;
    const dataUser = await bcrypt.compare(passwordUser, hashedPaswword);
    if (dataUser) {
      const user = { _id: UserId[0]._id.toHexString() }
      const sessionCreate = await createSession(user._id)
      const tokenId = {token:sessionCreate}
      return tokenId
    } else {
      return {
        message: "Su contraseña no coincide",
      };
    }
  } catch (err) {
    console.error("Error al verificar la contraseña:", err);
    return {
      message: "An error occurred while creating your account.",
    };
  }
}



 
export async function logout() {
  deleteSession()
  redirect('/')
}
