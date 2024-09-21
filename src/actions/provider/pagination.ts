"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProvider = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const providers = await prisma.proveedores.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    // 2. Obtener el total de páginas
    // todo:
    const totalCount = await prisma.proveedores.count();

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      providers,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
