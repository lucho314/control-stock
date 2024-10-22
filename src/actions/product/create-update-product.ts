"use server";

import prisma from "@/lib/prisma";
import { Producto } from "@/types";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getProductByID } from "./get-product-by-code";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z.string().min(3).max(255),
  descripcion: z.string().min(3).max(255),
  categoria_id: z.string().uuid().optional().nullable(),
  precio: z.preprocess((val) => parseFloat(val as string), z.number().min(0)),
  precio_costo: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0)
  ),
  porcentaje_ganancia: z.preprocess(
    (val) => parseFloat(val as string),
    z.number().min(0)
  ),
  codigo_de_barras: z.string().min(3).max(255).optional().nullable(),
  proveedor_id: z.string().uuid().optional().nullable(),
  codigo_interno: z.string().min(3).max(255),
  inStock: z.number().min(1),
  marca: z.string().min(3).max(255),
  imagen: z.string().min(3).max(255).optional().nullable(),
});

export const createUpdateProduct = async (
  product: Producto
): Promise<{
  ok: boolean;
  product?: any;
  error?: string;
  type?: string;
}> => {
  const productParsed = productSchema.safeParse(product);

  if (!productParsed.success) {
    console.error("Error en la validación:", productParsed.error);
    console.log(product);
    return { ok: false, error: "Error en la validación de datos" };
  }

  const newProduct = productParsed.data;
  const { id, nombre, descripcion, codigo_interno, ...rest } = newProduct;

  const existProduct = await getProductByID(codigo_interno);

  if (existProduct) {
    if (existProduct.activo === false) {
      return {
        ok: false,
        error: `El codigo ${codigo_interno} ya existe y corresponde al producto ${existProduct.nombre} pero está inactivo`,
        type: "inactive",
      };
    }

    return {
      ok: false,
      error: "Ya existe un producto con ese código",
      type: "exist",
    };
  }

  try {
    const dataProduct = {
      nombre: nombre?.toUpperCase(),
      descripcion: descripcion?.toUpperCase(),
      codigo_interno: codigo_interno?.toUpperCase(),
      ...rest,
    };

    if (id) {
      const updatedProduct = await prisma.productos.update({
        where: { id },
        data: dataProduct,
      });
      revalidatePath("/productos");
      return { ok: true, product: updatedProduct };
    } else {
      const newProduct = await prisma.productos.create({
        data: dataProduct,
      });
      revalidatePath("/productos");
      return { ok: true, product: newProduct };
    }
  } catch (error) {
    console.error("Error al crear/actualizar producto:", error);
    return { ok: false, error: "Error desconocido", type: "unknown" };
  }
};

// const uploadImages = async (images: File[]) => {
//   try {
//     const uploadPromises = images.map(async (image) => {
//       try {
//         const buffer = await image.arrayBuffer();
//         const base64Image = Buffer.from(buffer).toString("base64");

//         return cloudinary.uploader
//           .upload(`data:image/png;base64,${base64Image}`)
//           .then((r) => r.secure_url);
//       } catch (error) {
//         console.log(error);
//         return null;
//       }
//     });

//     const uploadedImages = await Promise.all(uploadPromises);
//     return uploadedImages;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// };
