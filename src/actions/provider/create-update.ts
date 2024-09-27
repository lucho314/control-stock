"use server";

import prisma from "@/lib/prisma";
import { type Provider } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const providerSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z.string().min(3).max(255),
  telefono: z.string().min(3).max(255),
  email: z.string().email(),
  direccion: z.string().min(3).max(255),
});

export const createUpdateProvider = async (proveedor: Provider) => {
  const providerParse = providerSchema.safeParse(proveedor);

  if (!providerParse.success) {
    console.log(providerParse.error);
    return { ok: false };
  }

  const provider = providerParse.data;

  const { id, ...rest } = provider;
  try {
    let provider;
    if (id) {
      // Actualizar
      provider = await prisma.proveedores.update({
        where: { id },
        data: {
          ...rest,
        },
      });
    } else {
      provider = await prisma.proveedores.create({
        data: {
          ...rest,
        },
      });
    }
    revalidatePath("/provider");
    return {
      ok: true,
      provider: provider,
      message: "Proveedor guardado correctamente",
    };
  } catch (error) {
    console.log(error);
    return {
      ok: false,
      provider: null,
      message: "Error al guardar el proveedor",
    };
  }

  //revalidar path
};
