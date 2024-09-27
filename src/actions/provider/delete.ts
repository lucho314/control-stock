"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProvider = async (id: string) => {
  await prisma.proveedores.update({
    where: {
      id,
    },
    data: {
      activo: false,
    },
  });
  revalidatePath("/providers");
};
