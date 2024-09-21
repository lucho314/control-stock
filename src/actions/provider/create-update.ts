"use server";

import prisma from "@/lib/prisma";
import { z } from "zod";

const providerSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z.string().min(3).max(255),
  contacto: z.string().min(3).max(255),
  direccion: z.string().min(3).max(255),
});

export const createUpdateProvider = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const providerParse = providerSchema.safeParse(data);

  if (!providerParse.success) {
    console.log(providerParse.error);
    return { ok: false };
  }

  const provider = providerParse.data;

  const { id, ...rest } = provider;

  if (id) {
    // Actualizar
    const provider = await prisma.proveedores.update({
      where: { id },
      data: {
        ...rest,
      },
    });

    return { ok: true, provider };
  }

  const newProvider = await prisma.proveedores.create({
    data: {
      ...rest,
    },
  });

  //revalidar path

  return { ok: true, provider: newProvider };
};
