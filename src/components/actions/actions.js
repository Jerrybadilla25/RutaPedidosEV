"use server";
import User from '@/model/User'


export async function changeRoll(sata, formData) {
  try {
    // Extraer datos del formulario
    const userId = formData.get("userId");
    const newRoll = formData.get("role");
    const user = await User.findByIdAndUpdate(userId, {role:newRoll})
    return {
        success: true,
        message: "¡Rol actualizado exitosamente!"
      };
      
  } catch (error) {
    console.log(error);
    return {
        success: false,
        message: "No se pudo actualizar el rol."
      };
     
  }
  
}
