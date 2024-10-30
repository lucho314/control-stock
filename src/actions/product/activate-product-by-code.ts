"use server";

import { isAdmin } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const querySchema = z.object({
  code: z.string().min(3).max(255),
});

export const activateProductByCode = async (query: { code: string }) => {
  const [error, userId] = await isAdmin();

  if (error) {
    console.error(error);
    return { ok: false, error };
  }

  const codeParsed = querySchema.safeParse(query);

  if (!codeParsed.success) {
    console.error("Error en la validación:", codeParsed.error);

    return { ok: false, error: "Error en la validación de datos" };
  }

  const { code: codeValue } = codeParsed.data;

  try {
    const updated = await prisma.productos.update({
      where: {
        codigo_interno: codeValue,
      },
      data: {
        activo: true,
        updated_by: userId,
      },
    });

    revalidatePath("/productos");

    return { ok: true, updated };
  } catch (error) {
    console.error("Error al activar el producto:", error);
    return { ok: false, error: "Error al activar el producto" };
  }
};
