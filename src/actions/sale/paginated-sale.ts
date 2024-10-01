"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  q?: string;
}

export const getPaginatedSale = async ({
  page = 1,
  take = 12,
  q,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // 1. Obtener los productos
    const sales = await prisma.venta.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        numeracion: {
          contains: q,
          mode: "insensitive",
        },
      },
    });

    // 2. Obtener el total de páginas
    // todo:
    const totalCount = await prisma.venta.count();

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      sales,
    };
  } catch (error) {
    throw new Error("No se pudo cargar las ventas");
  }
};
