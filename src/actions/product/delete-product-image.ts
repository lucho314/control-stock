"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProductImage = async (id: string) => {
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
