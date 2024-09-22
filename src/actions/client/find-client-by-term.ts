import prisma from "@/lib/prisma";

interface Porps {
  term: string;
}

export const findClientByTerm = async ({ term }: Porps) => {
  try {
    const client = await prisma.clientes.findFirst({
      where: {
        OR: [
          { dni: term },
          { nombre: term },
          { email: term },
          { telefono: term },
        ],
      },
    });

    return client;
  } catch (error) {
    throw new Error("No se pudo cargar el cliente");
  }
};
