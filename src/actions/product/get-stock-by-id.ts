"use server";

import prisma from "@/lib/prisma";
// import { sleep } from '@/utils';

export const getStockByID = async (id: string): Promise<number> => {
  try {
    // await sleep(3);

    const stock = await prisma.productos.findFirst({
      where: { id },
      select: { inStock: true },
    });

    return stock?.inStock ?? 0;
  } catch (error) {
    return 0;
  }
};
