"use server";
import prisma from "@/lib/prisma";

interface SearchProductsArgs {
  codigo?: string;
  nombre?: string;
  proveedor?: string;
  rubro?: string;
  marca?: string;
  peso?: number;
}

export async function searchProducts(args: SearchProductsArgs) {
  const { codigo, nombre, proveedor, rubro, marca, peso } = args;
  // Construir condiciones de búsqueda
  const conditions: any = {};

  if (codigo) {
    conditions.codigo_interno = {
      contains: codigo.toUpperCase(),
      mode: "insensitive",
    };
  }
  if (nombre) {
    conditions.nombre = { contains: nombre.toUpperCase(), mode: "insensitive" };
  }
  if (proveedor) {
    conditions.proveedor = {
      contains: proveedor.toUpperCase(),
      mode: "insensitive",
    }; // Asegúrate de que el campo existe en tu modelo
  }
  if (rubro) {
    conditions.rubro = { contains: rubro.toUpperCase(), mode: "insensitive" };
  }
  if (marca) {
    conditions.marca = { contains: marca.toUpperCase(), mode: "insensitive" };
  }
  if (peso !== undefined) {
    conditions.peso = { equals: peso };
  }

  return await prisma.productos.findMany({
    where: conditions,
    //maximo 5 productos
    take: 5,
  });
}
