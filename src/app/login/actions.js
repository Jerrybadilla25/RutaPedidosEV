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
  // Extraer datos del formulario
  const userEmail = formData.get("email");
  const userPassword = formData.get("password");

  // Validar que existan el correo y la contraseña
  if (!userEmail || !userPassword) {
    console.log("Faltan datos: email o contraseña no proporcionados");
    return;
  }

  // Buscar usuario en la base de datos
  connectDB()
  const dataUser = await User.find({ email: userEmail });
  if (!dataUser) {
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

  // Continuar con el proceso si las credenciales son válidas
  //crear sesscion
  const idUser = dataUser[0]._id.toString()
  console.log(idUser)
  await createSession({ userId: idUser});
  redirect("/dashboard");
}
