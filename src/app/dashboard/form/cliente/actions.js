"use server";
import { addClientDbFormSchema } from "@/utils/definiciones";
import { getUser } from "@/utils/dal";
import Cliente from "@/model/Cliente";
import { createIdClient } from "@/utils/creteSku";
import { redirect } from "next/navigation";

export async function addClientBd(state, formData) {
  try {
    // Validar los datos del formulario
    const validatedFields = addClientDbFormSchema.safeParse({
      name: formData.get("name"),
      email: formData.get("email"),
      contact: formData.get("contact"),
      cel: formData.get("cel"),
      cedJuridica: formData.get("cedJuridica"),
      provincia: formData.get("provincia"),
      canton: formData.get("canton"),
      distrito: formData.get("distrito"),
      direccion: formData.get("direccion"),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
      };
    }

    const user = await getUser();
    const userCreator = user.user;
    const clientId = await createIdClient();

    const {
      name,
      email,
      contact,
      cel,
      cedJuridica,
      provincia,
      canton,
      distrito,
      direccion,
    } = validatedFields.data;

    // Crear un nuevo cliente
    const newCliente = new Cliente({
      name,
      email,
      contact,
      cel,
      cedJuridica,
      userCreator,
      clientId,
      address: {
        provincia,
        canton,
        distrito,
        direccion,
      },
    });

    await newCliente.save();
  } catch (error) {
    console.error("Error al agregar un cliente a la base de datos:", error);
    return { error: "No se pudo agregar el cliente. Por favor, intente nuevamente." };
  }

  // Redirigir fuera del bloque try-catch para evitar que no se ejecute en caso de error
  redirect("/dashboard/form/pedido");
}

