import { generarReciboDeVenta } from "@/reportes/generarReciboDeVenta";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const ventaId = new URL(request.url).searchParams.get("ventaId");

  if (!ventaId || typeof ventaId !== "string") {
    return NextResponse.json(
      { error: "Parámetros incorrectos" },
      { status: 400 }
    );
  }

  return NextResponse.json({ ventaId });

  // try {
  //   const pdfBuffer = await generarReciboDeVenta(ventaId);

  //   if (!pdfBuffer) {
  //     return NextResponse.json(
  //       { error: "Venta no encontrada" },
  //       { status: 404 }
  //     );
  //   }

  //   return new NextResponse(pdfBuffer, {
  //     status: 200,
  //     headers: {
  //       "Content-Type": "application/pdf",
  //       "Content-Disposition": `attachment; filename=venta-${ventaId}.pdf`,
  //     },
  //   });
  // } catch (error) {
  //   console.error(error);
  //   return NextResponse.json(
  //     { error: "Error interno del servidor" },
  //     { status: 500 }
  //   );
  // }
}
