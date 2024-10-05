"use server";

import prisma from "@/lib/prisma";

export const getProductByID = async (code: string) => {
  try {
    const product = await prisma.productos.findFirst({
      where: {
        codigo_interno: code.toUpperCase(),
      },
    });

    if (!product) return null;

    let producto = JSON.parse(JSON.stringify(product));

    producto.precio = parseFloat(producto.precio);
    return producto;
  } catch (error) {
    console.log(error);
    throw new Error("Error al obtener producto por ID");
  }
};
