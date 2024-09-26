import { productos } from "@prisma/client";
import prisma from "../lib/prisma";
import { initialData } from "./seed";

async function main() {
  await prisma.facturas.deleteMany();
  await prisma.recepciones_de_productos.deleteMany();
  await prisma.ordenes_de_venta.deleteMany();
  await prisma.ordenes_de_compra.deleteMany();
  await prisma.inventario.deleteMany();
  await prisma.productos.deleteMany();
  await prisma.proveedores.deleteMany();
  await prisma.usuarios.deleteMany();
  await prisma.clientes.deleteMany();
  await prisma.user.deleteMany();
  await prisma.categoria.deleteMany();

  await prisma.categoria.createMany({
    data: initialData.categories,
  });

  await prisma.user.createMany({
    data: initialData.users,
  });

  await prisma.proveedores.createMany({
    data: initialData.providers,
  });

  const productos = [];

  for await (const element of initialData.products) {
    const proveedorId = await getRandomProveedor();
    const categoriaId = await getCategoria();

    productos.push({
      ...element,
      proveedor_id: proveedorId,
      categoria_id: categoriaId,
    });
  }

  await prisma.productos.createMany({
    data: productos,
  });

  await prisma.clientes.create({
    data: {
      nombre: "cliente generico",
      email: "clienteA@example.com",
      telefono: "123456789",
      direccion: "Dirección Cliente A",
      dni: "12345678",
    },
  });

  console.log("Database seeded successfully");
}

(() => {
  if (process.env.NODE_ENV === "production") return;

  main();
})();

async function getRandomProveedor() {
  // Generar un índice aleatorio (0 o 1)
  const randomIndex = Math.floor(Math.random() * 2);

  // Obtener el proveedor correspondiente al índice aleatorio
  const randomProveedor = await prisma.proveedores.findMany({
    take: 1,
    skip: randomIndex,
  });

  return randomProveedor[0].id;
}

async function getCategoria() {
  // Generar un índice aleatorio (0 o 13)
  const randomIndex = Math.floor(Math.random() * 2);

  // Obtener el proveedor correspondiente al índice aleatorio
  const categorias = await prisma.categoria.findMany({
    take: 1,
    skip: randomIndex,
  });

  return categorias[0].id;
}
