import { z } from 'zod'
 
export const SignupFormSchema = z.object({
  user: z
    .string()
    .min(2, { message: 'El nombre debe contener minimo 2 letras' })
    .trim(),
  email: z.string().email({ message: 'Ingrese un email valido.' }).trim(),
  password: z
    .string()
    .min(8, { message: 'Debe tener un minimo de 8 caracteres' })
    .regex(/[a-zA-Z]/, { message: 'Contiene al menos una letra.' })
    .regex(/[0-9]/, { message: 'Contiene al menos un numero.' })
    .regex(/[^a-zA-Z0-9]/, {
      message: 'Contiene al menos un caracter especial.',
    })
    .trim(),
})