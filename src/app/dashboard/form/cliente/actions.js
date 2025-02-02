"use server";
import { addClientDbFormSchema } from "@/utils/definiciones";
import { getUser } from "@/utils/dal";
import Cliente from "@/model/Cliente";
import { redirect } from "next/navigation";

export async function addClientBd(state, formData) {
 
  try {
    // Validar los datos del formulario
    const validatedFields = addClientDbFormSchema.safeParse({
      name: formData.get("name"),
      clientId: formData.get("clientId"),
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

    const {
      name,
      clientId,
      email,
      contact,
      cel,
      cedJuridica,
      provincia,
      canton,
      distrito,
      direccion,
    } = validatedFields.data;

    const validateClienteID = await Cliente.findOne({ clientId });
    

    if (!validateClienteID) {
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
    } else {
      await Cliente.findByIdAndUpdate(validateClienteID._id, {
        $set: {
          name,
          email,
          cel,
          cedJuridica,
          contact,
          address: {
            provincia,
            canton,
            distrito,
            direccion,
          },
        },
      });
    }

   

  } catch (error) {
    console.error("Error al agregar un cliente a la base de datos:", error);
    return { error: "No se pudo agregar el cliente. Por favor, intente nuevamente." };
  }
   // Redirigir solo si todo fue procesado correctamente
   redirect("/dashboard/form/pedido");
}


