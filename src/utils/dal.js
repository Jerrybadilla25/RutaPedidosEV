import "server-only";

import { cookies } from "next/headers";
import { decrypt } from "@/utils/session";
import { cache } from "react";
import User from "@/model/User";
import Roles from "@/model/Roles";
import { redirect } from "next/navigation";

export const verifySession = cache(async () => {
  try {
    const cookie = (await cookies()).get("session")?.value;
    if (!cookie) {
      redirect("/singin");
    }
    const session = await decrypt(cookie);
    if (!session.userId) {
      redirect("/singin");
    }

    return { isAuth: true, userId: session.userId };
  } catch (error) {
    console.error("Error verificando la sesión:", error.message);
    redirect("/");
  }
});

export const getUser = cache(async () => {
  const session = await verifySession();
  console.log(session)
  if (!session) return null;

  try {
    // llamar usuario a la base de datos
    let dataUser = await User.findById(session.userId.userId)
      .select("-password -email -fecha")
      .lean();
    let rolUser = await Roles.findById(dataUser.roles[0].toString());
    let updataUser = { ...dataUser, rol: rolUser.rol };
    return updataUser;
  } catch (error) {
    console.log("Failed to fetch user");
    return null;
  }
});
