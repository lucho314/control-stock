"use server";

import prisma from "@/lib/prisma";

export const getProductByID = async (id: string) => {
  try {
    const product = await prisma.productos.findFirst({
      where: {
        id: id,
      },
    });

    if (!product) return null;

    return product;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por ID");
  }
};
