"use server";
import { redirect } from "next/navigation";
import User from "@/model/User";
import { connectDB } from "@/utils/dbserver";
import bcrypt from "bcryptjs";
import { createSession } from "@/utils/session";
//import { cookies } from 'next/headers'
import { deleteSession } from "@/utils/session";
import { SignupFormSchema } from "@/utils/definiciones";
//import Roles from '@/model/Roles'


export async function signIn(state, formData) {
 
  try {
    // Extraer datos del formulario
    const userEmail = formData.get("email");
    const userPassword = formData.get("password");

    // Validar que existan el correo y la contraseña
    if (!userEmail || !userPassword) {
      console.log("Faltan datos: email o contraseña no proporcionados");
      return;
    }

    // Buscar usuario en la base de datos
    connectDB();
    const dataUser = await User.find({ email: userEmail });
    if (!dataUser || dataUser.length === 0) {
      console.log("El usuario no existe");
      return;
    }

    // Verificar contraseña
    const hashedPassword = dataUser[0].password;
    const isPasswordCorrect = await bcrypt.compare(userPassword, hashedPassword);

    if (!isPasswordCorrect) {
      console.log("Contraseña incorrecta");
      return;
    }

    // Crear sesión
    const idUser = dataUser[0]._id.toString();
    await createSession({ userId: idUser });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
  }

  // Redireccionar después de que todo el proceso haya sido exitoso
  redirect("/dashboard");
}

