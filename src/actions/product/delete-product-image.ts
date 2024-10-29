"use server";

import { isAdmin } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (id: string) => {
  const [error, userId] = await isAdmin();

  if (error) {
    console.error(error);
    return { ok: false, error };
  }

  await prisma.productos.update({
    where: {
      id,
    },
    data: {
      activo: false,
    },
  });

  revalidatePath("/productos");
};
