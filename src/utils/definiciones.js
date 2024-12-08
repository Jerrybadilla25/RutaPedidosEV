import { z } from "zod";

export const SignupFormSchema = z.object({
  user: z
    .string()
    .min(2, { message: "El nombre debe contener minimo 2 letras" })
    .trim(),
  email: z.string().email({ message: "Ingrese un email valido." }).trim(),
  password: z
    .string()
    .min(8, { message: "Debe tener un minimo de 8 caracteres" })
    .regex(/[a-zA-Z]/, { message: "Contiene al menos una letra." })
    .regex(/[0-9]/, { message: "Contiene al menos un numero." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Contiene al menos un caracter especial.",
    })
    .trim(),
});

export const addClientDbFormSchema = z.object({
  name: z
    .string()
    .min(4, { message: "El nombre debe contener minimo 4 letras" })
    .trim(),
  email: z
    .string()
    .email({ message: "Ingrese un email valido." })
    .trim(),
  contact: z
    .string()
    .min(2, { message: "El nombre debe contener minimo 2 letras" })
    .trim(),
  cel: z
    .string()
    .min(8, { message: "El numero debe contener 8 numeros" })
    .trim(),
  cedJuridica: z
    .string()
    .min(2, { message: "El dato debe contener minimo 2 letras" })
    .trim(),
  provincia: z
    .string()
    .min(2, { message: "El dato debe contener minimo 2 letras" })
    .trim(),
  canton: z
    .string()
    .min(2, { message: "El dato debe contener minimo 2 letras" })
    .trim(),
  distrito: z
    .string()
    .min(2, { message: "El dato debe contener minimo 2 letras" })
    .trim(),
  direccion: z
    .string()
    .min(2, { message: "El dato debe contener minimo 2 letras" })
    .trim()
});
