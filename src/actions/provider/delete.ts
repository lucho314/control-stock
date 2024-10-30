"use server";

import { isAdmin } from "@/lib/middleware";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProvider = async (id: string) => {
  const [error, userId] = await isAdmin();

  if (error) {
    console.error(error);
    return { ok: false, error };
  }
  await prisma.proveedores.update({
    where: {
      id,
    },
    data: {
      activo: false,
      updated_by: userId,
    },
  });
  revalidatePath("/providers");
};
