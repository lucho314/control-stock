"use server";

import prisma from "@/lib/prisma";

export const getProductByID = async (code: string) => {
  try {
    const product = await prisma.productos.findFirst({
      where: {
        codigo_interno: code,
      },
    });

    if (!product) return null;

    return JSON.parse(JSON.stringify(product));
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por ID");
  }
};
