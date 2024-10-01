"use server";

import prisma from "@/lib/prisma";
import { sumarySale, Venta, type Provider } from "@/types";
import { FormaDePago } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { z } from "zod";

/**
 * fecha: Date;
    numeracion: string;
    subTotal: number;
    iva: number;
    total: number;
    productItems: ProductoVenta[];
 */
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

export const createSale = async (venta: sumarySale) => {
  const saleParse = providerSchema.safeParse(venta);

  if (!saleParse.success) {
    console.log(saleParse.error);
    return { ok: false };
  }

  const sale = saleParse.data;

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
