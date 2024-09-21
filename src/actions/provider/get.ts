import prisma from "@/lib/prisma";

export const getProveedor = async (id: string) => {
  const provider = await prisma.proveedores.findUnique({
    where: { id },
  });

  return provider;
};
