import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";

export async function GET(request: Request) {
  //truncate tables
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

  const proveedor1 = await prisma.proveedores.create({
    data: {
      nombre: "Proveedor A",
      contacto: "Contacto A",
      direccion: "Dirección A",
    },
  });

  const proveedor2 = await prisma.proveedores.create({
    data: {
      nombre: "Proveedor B",
      contacto: "Contacto B",
      direccion: "Dirección B",
    },
  });

  // Crear clientes
  const cliente1 = await prisma.clientes.create({
    data: {
      nombre: "Cliente A",
      email: "clienteA@example.com",
      telefono: "123456789",
      direccion: "Dirección Cliente A",
      dni: "12345678",
    },
  });

  const cliente2 = await prisma.clientes.create({
    data: {
      nombre: "Cliente B",
      email: "clienteB@example.com",
      telefono: "987654321",
      direccion: "Dirección Cliente B",
      dni: "87654321",
    },
  });

  // Crear productos
  const producto1 = await prisma.productos.create({
    data: {
      nombre: "Producto A",
      descripcion: "Descripción del Producto A",
      categoria: "Categoría A",
      precio: 100.0,
      codigo_de_barras: "1234567890123",
      proveedor_id: proveedor1.id,
    },
  });

  const producto2 = await prisma.productos.create({
    data: {
      nombre: "Producto B",
      descripcion: "Descripción del Producto B",
      categoria: "Categoría B",
      precio: 200.0,
      codigo_de_barras: "9876543210987",
      proveedor_id: proveedor2.id,
    },
  });

  // Crear órdenes de compra
  const ordenCompra1 = await prisma.ordenes_de_compra.create({
    data: {
      proveedor_id: proveedor1.id,
      fecha_orden: new Date(),
      estado: "Pendiente",
    },
  });

  const ordenCompra2 = await prisma.ordenes_de_compra.create({
    data: {
      proveedor_id: proveedor2.id,
      fecha_orden: new Date(),
      estado: "Completada",
    },
  });

  // Crear recepciones de productos
  await prisma.recepciones_de_productos.create({
    data: {
      orden_compra_id: ordenCompra1.id,
      producto_id: producto1.id,
      cantidad_recibida: 50,
      fecha_recepcion: new Date(),
    },
  });

  await prisma.recepciones_de_productos.create({
    data: {
      orden_compra_id: ordenCompra2.id,
      producto_id: producto2.id,
      cantidad_recibida: 30,
      fecha_recepcion: new Date(),
    },
  });

  // Crear órdenes de venta
  const ordenVenta1 = await prisma.ordenes_de_venta.create({
    data: {
      cliente_id: cliente1.id,
      fecha_orden: new Date(),
      estado: "Enviado",
    },
  });

  //detalle de orden de venta

  await prisma.detalle_ordenes_de_venta.create({
    data: {
      orden_venta_id: ordenVenta1.id,
      producto_id: producto1.id,
      cantidad: 1,
      precio_unitario: 100.0,
    },
  });

  // Crear facturas
  await prisma.facturas.create({
    data: {
      orden_venta_id: ordenVenta1.id,
      total: 100.0,
      fecha_factura: new Date(),
    },
  });

  const user = await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@mail.com",
      password: bcryptjs.hashSync("administrador"),
    },
  });

  console.log("Seeding completed");

  return NextResponse.json({ message: "Hello, World!" });
}
