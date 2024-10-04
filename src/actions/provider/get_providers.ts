"use server";

import prisma from "@/lib/prisma";

export interface IProvider {
  id: string;
  nombre: string | null;
  telefono: string | null;
  email: string | null;
  direccion: string | null;
  activo: boolean | null;
}

export const getProviders = async (): Promise<IProvider[]> => {
  try {
    const providers = prisma.proveedores.findMany();
    return providers;
  } catch (error) {
    throw new Error("No se pudo recuperar los proveedores");
  }
};
