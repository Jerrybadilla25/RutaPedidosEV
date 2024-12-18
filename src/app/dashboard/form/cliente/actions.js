"use server"
import {addClientDbFormSchema} from '@/utils/definiciones'
import {getUser} from '@/utils/dal'
import Cliente from '@/model/Cliente'
import { nanoid } from "nanoid"
import {redirect} from 'next/navigation'

export async function addClientBd(state, formData) {
  console.log(formData)
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
      const user = await getUser()
      const userCreator = user.user
      const clientId = nanoid(10);
      const {name, email, contact, cel, cedJuridica, provincia, canton, distrito, direccion}=validatedFields.data
      const newCliente = new Cliente({
        name,
        email,
        contact,
        cel,
        cedJuridica,
        userCreator,
        clientId,
        address:{
          provincia,
          canton,
          distrito,
          direccion
        }
      })
      await newCliente.save()
      redirect('/dashboard/form/pedido')
}
