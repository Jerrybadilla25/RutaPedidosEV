"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function deleteSession() {
  const cookieStore = cookies();
  cookieStore.delete("session"); // Eliminar la cookie 'session'
  redirect("/"); // Redirigir a la página de inicio de sesión
}
