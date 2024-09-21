"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteProvider = async (id: string) => {
  await prisma.proveedores.delete({
    where: {
      id,
    },
  });
  //revalidar path
  revalidatePath("/providers");
};
