"use server";

import { isAdmin } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const argentinaPhoneRegex = /^(\+549\d{10}|\d{10})$/;

const providerSchema = z.object({
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

// Definición del estado con posibles errores y mensaje
interface State {
  errors?: {
    id?: string[];
    nombre?: string[];
    telefono?: string[];
    email?: string[];
    direccion?: string[];
  };
  message?: string | null;
}

export async function createUpdateProvider(
  state: State | void,
  formData: FormData
): Promise<State | void> {
  const [error, userId] = await isAdmin();

  if (error) {
    console.error(error);
    return {
      errors: { id: ["No tienes permisos para realizar esta acción."] }, // O puedes usar un mensaje más apropiado
      message: "Error de autorización.",
    };
  }

  // Validación de los datos del formulario
  const validatedFields = providerSchema.safeParse({
    id: formData.get("id"),
    nombre: formData.get("nombre"),
    telefono: formData.get("telefono"),
    email: formData.get("email"),
    direccion: formData.get("direccion"),
  });

  // Si la validación falla, retornar los errores
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create or Update Provider.",
    };
  }

  const provider = validatedFields.data;
  const { id, ...rest } = provider;

  try {
    if (id) {
      // Actualizar proveedor existente
      await prisma.proveedores.update({
        where: { id },
        data: { ...rest },
      });
    } else {
      // Crear nuevo proveedor
      await prisma.proveedores.create({
        data: { ...rest },
      });
    }

    // Revalidar el cache del path para reflejar los cambios
    revalidatePath("/provider");

    return {
      errors: {},
      message: "successfully",
    };
  } catch (error) {
    console.error("Error saving provider:", error);

    // Retornar el estado con un mensaje de error
    return {
      errors: {},
      message: "Error al guardar el proveedor. Por favor, inténtalo de nuevo.",
    };
  }
}
