import { z } from "zod";

const argentinaPhoneRegex = /^(\+549\d{10}|\d{10})$/;
export const providerSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z
    .string({
      message: "Nombre es requerido",
    })
    .min(3, { message: "Nombre debe tener al menos 3 caracteres" })
    .max(255),
  telefono: z.string().regex(argentinaPhoneRegex, {
    message:
      "Teléfono no es válido. Ej (por ejemplo: +5491112345678 o 1112345678)",
  }),
  email: z
    .string({
      message: "Email es requerido",
    })
    .email({
      message: "Email no es válido",
    }),
  direccion: z
    .string({
      message: "Direccion es requerido",
    })
    .min(3, { message: "Direccion debe tener al menos 3 caracteres" })
    .max(255),
});
