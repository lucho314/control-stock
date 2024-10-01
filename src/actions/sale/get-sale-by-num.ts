import prisma from "@/lib/prisma";
import { venta } from "@prisma/client";

export async function getSaleyId(id: string): Promise<venta | null> {
  try {
    const venta = await prisma.venta.findUnique({
      where: {
        id: id, // Buscamos la venta por el campo 'id'
      },
      include: {
        productos: {
          include: {
            productos: true, // Incluimos detalles de cada producto relacionado
          },
        },
      },
    });

    console.log("Venta encontrada:", venta); // Imprimimos la venta encontrada

    return venta; // Retorna la venta encontrada o null si no se encuentra
  } catch (error) {
    console.error("Error al obtener la venta:", error); // Manejo de errores
    return null;
  }
}
