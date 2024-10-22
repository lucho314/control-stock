"use server";

import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
  q?: string;
}

export const getPaginatedProducts = async ({
  page = 1,
  take = 12,
  q,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    // Contar el número total de productos que coinciden con el término de búsqueda
    const totalCount = await prisma.productos.count({
      where: {
        nombre: {
          contains: q,
          mode: "insensitive",
        },
        activo: true,
      },
    });

    const products = await prisma.productos.findMany({
      take: take,
      skip: (page - 1) * take,
      where: {
        activo: true,
        OR: [
          {
            nombre: {
              contains: q,
              mode: "insensitive",
            },
          },
          {
            categoria: {
              nombre: {
                contains: q,
                mode: "insensitive",
              },
            },
          },
          {
            proveedores: {
              nombre: {
                contains: q,
                mode: "insensitive",
              },
            },
          },
        ],
      },
      include: {
        categoria: true,
        proveedores: true,
      },
    });

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      totalCount: totalCount,
      products: products,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos");
  }
};
