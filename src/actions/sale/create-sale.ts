"use server";

import prisma from "@/lib/prisma";
import { ProductoVenta, sumarySale, Venta, type Provider } from "@/types";
import { FormaDePago, productos } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const providerSchema = z.object({
  fecha: z.date(),
  numeracion: z.string(),
  subTotal: z.number(),
  total: z.number(),
  bonificacion: z.number().nullable().optional(),
  formaDePago: z.string(),
  productItems: z.array(
    z.object({
      id: z.string().optional(),
      cantidad: z.number(),
      total: z.number(),
      producto: z.object({
        id: z.string().optional(),
        nombre: z.string(),
        precio: z.number(),
      }),
    })
  ),
});

const checkStock = async (products: ProductoVenta[]) => {
  const productsId = products.map((p) => p.producto.id!);

  const productsDB = await prisma.productos.findMany({
    select: {
      id: true,
      inStock: true,
    },
    where: {
      id: {
        in: productsId,
      },
    },
  });

  const productsInStock = productsDB.filter((p) => {
    const product = products.find((p2) => p2.producto.id === p.id);
    return p.inStock >= product!.cantidad;
  });

  return productsInStock.length === products.length;
};

export const createSale = async (venta: sumarySale) => {
  const saleParse = providerSchema.safeParse(venta);

  if (!saleParse.success) {
    console.log(saleParse.error);
    return { ok: false };
  }

  const sale = saleParse.data;

  const stock = await checkStock(sale.productItems as ProductoVenta[]);
  if (!stock) {
    console.error("No hay stock suficiente");
    return { ok: false, message: "No hay stock suficiente" };
  }

  try {
    //iniciar transaccion prisma
    const transaction = await prisma.$transaction([
      prisma.venta.create({
        data: {
          numeracion: sale.numeracion,
          fecha: sale.fecha,
          subTotal: sale.subTotal,
          total: sale.total,
          clienteId: "68c1fb15-b85f-4028-9e7b-fd4b5f1a448e",
          formaDePago: sale.formaDePago as FormaDePago,
          iva: 0,
          neto: sale.subTotal,
          numero: sale.numeracion,
          bonificacion: sale.bonificacion,
          productos: {
            create: sale.productItems.map((p) => ({
              cantidad: p.cantidad,
              total: p.total,
              productoId: p.producto.id!, // Use productoId directly
              iva: 0,
              precio: p.producto.precio,
            })),
          },
        },
      }),
    ]);

    if (transaction) {
      revalidatePath("/admin/sale");
      return { ok: true };
    }
  } catch (error) {
    console.log(error);
  }
};
