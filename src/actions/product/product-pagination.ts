"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.productos.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.productos.count();

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      products,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
