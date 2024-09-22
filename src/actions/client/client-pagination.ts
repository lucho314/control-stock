import prisma from "@/lib/prisma";

interface PaginationOptions {
  page?: number;
  take?: number;
}

export const getPaginatedClient = async ({
  page = 1,
  take = 12,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const clients = await prisma.clientes.findMany({
      take: take,
      skip: (page - 1) * take,
    });

    const totalCount = await prisma.clientes.count();

    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages: totalPages,
      clients,
    };
  } catch (error) {
    throw new Error("No se pudo cargar los clientes");
  }
};
