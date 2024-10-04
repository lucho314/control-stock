"use server";

import prisma from "@/lib/prisma";

export interface ICategory {
  id: string;
  nombre: string;
  descripcion: string | null;
}

export const getCategories = async (): Promise<ICategory[]> => {
  try {
    const categories = await prisma.categoria.findMany();
    return categories;
  } catch (error) {
    throw new Error("No se pudo recuperar las categorias");
  }
};
