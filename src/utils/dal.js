import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { cache } from "react";
import User from "@/model/User";
//import Roles from "@/model/Roles";
import { redirect } from "next/navigation";



export const verifySession = cache(async () => {
  // Obtiene la cookie de sesión
  const cookie = (await cookies()).get("session")?.value;

  // Si no hay cookie, redirigir a login
  if (!cookie) {
    redirect("/login");
    return; // Termina la ejecución para evitar problemas
  }

  let session;
  try {
    // Intenta desencriptar la cookie
    session = await decrypt(cookie);
  } catch (error) {
    console.error("Error al desencriptar la cookie:", error.message);

    // Si ocurre un error durante la desencriptación, redirigir a login
    redirect("/login");
    return; // Asegura que no continúe ejecutando
  }

  // Si la sesión es inválida o no tiene userId, redirigir a login
  if (!session || !session.userId) {
    redirect("/login");
    return;
  }

  // Si todo está bien, retornar la sesión validada
  return { isAuth: true, userId: session.userId };
});



export const getUser = cache(async () => {
  const session = await verifySession()
  if (!session) return null;

  try {
    // llamar usuario a la base de datos
    let dataUser = await User.findById(session.userId.userId)
      .select("-password -email -fecha")
      .lean();
    return dataUser;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});

/*

export const verifySession2 = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;

  // Si no hay cookie, redirigir a login
  if (!cookie) {
    redirect("/login");
    return; // Asegura que no continúe ejecutando el código
  }

  let session;
  try {
    session = await decrypt(cookie);
  } catch (error) {
    console.error("Error al desencriptar la cookie:", error.message);

    // Si ocurre un error en la desencriptación, redirigir a la página principal
    redirect("/");
    return;
  }

  // Si la sesión no tiene userId, redirigir a login
  if (!session?.userId) {
    redirect("/login");
    return;
  }

  // Si todo está bien, retornar la sesión
  return { isAuth: true, userId: session.userId };
});
*/

