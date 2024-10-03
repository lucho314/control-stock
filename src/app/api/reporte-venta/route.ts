import { generarReciboDeVenta } from "@/reportes/generarReciboDeVenta";
import { NextResponse } from "next/server";

export async function GET(request: Request, response: Response) {
     const ventaId = new URL(request.url).searchParams.get('ventaId');

     if (!ventaId || typeof ventaId !== 'string') {
      return NextResponse.json({ error: 'parametros icorrectos' }, { status: 400 });

      return;
    }

    const pdfBuffer = await generarReciboDeVenta(ventaId);

    if (!pdfBuffer) {
       return NextResponse.json({ error: 'Venta no encontrada' });
    }
  
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename=venta-${ventaId}.pdf`,
      },
    });
      
  }