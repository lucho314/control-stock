"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  nombre: z.string().min(3).max(255),
  descripcion: z.string().min(3).max(255),
  categoria_id: z.string().min(3).max(255),
  precio: z.number().min(0),
  codigo_de_barras: z.string().min(3).max(255),
  proveedor_id: z.string().uuid(),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;

  const { id, proveedor_id, ...rest } = product;

  const productData = {
    ...rest,
    proveedor_id: proveedor_id,
  };

  if (id) {
    await prisma.productos.update({
      where: { id },
      data: productData,
    });
  } else {
    await prisma.productos.create({
      data: productData,
    });
  }

  revalidatePath("/productos");
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
