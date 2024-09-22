"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const clientSchema = z.object({
  id: z.string().optional(),
  nombre: z.string(),
  contacto: z.string(),
  direccion: z.string(),
  email: z.string(),
  telefono: z.string(),
});

export const createUpdateClient = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const clientParsed = clientSchema.safeParse(data);

  if (!clientParsed.success) {
    console.log(clientParsed.error);
    return { ok: false };
  }

  const client = clientParsed.data;

  const { id, ...rest } = client;

  if (id) {
    await prisma.clientes.update({
      where: { id },
      data: rest,
    });
  } else {
    await prisma.clientes.create({
      data: rest,
    });
  }

  revalidatePath("/productos");
};
