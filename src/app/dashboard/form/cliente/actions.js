"use server"
import {addClientDbFormSchema} from '@/utils/definiciones'

export async function addClientBd(state, formData) {
    const validatedFields = addClientDbFormSchema.safeParse({
        name: formData.get('name'),
        email: formData.get('email'),
        contact: formData.get('contact'),
        cel: formData.get('cel'),
        cedJuridica: formData.get('cedJuridica'),
        provincia: formData.get('provincia'),
        canton: formData.get('canton'),
        distrito: formData.get('distrito'),
        direccion: formData.get('direccion')

      })
      
      if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }
      console.log(validatedFields)
}
