import puppeteer from "puppeteer";
import chromium from "@sparticuz/chromium";
import prisma from "@/lib/prisma";
import fs from "fs"; // Asegúrate de importar fs si lo necesitas para guardar el PDF

export async function generarReciboDeVenta(ventaId: string) {
  // Obtener la venta desde la base de datos usando Prisma
  const venta = await prisma.venta.findUnique({
    where: { id: ventaId },
    include: {
      productos: {
        include: {
          productos: true, // Traer detalles del producto
        },
      },
      cliente: true, // Traer detalles del cliente
    },
  });

  if (!venta) {
    console.log("Venta no encontrada");
    return;
  }

  // Crear el contenido HTML para el recibo
  const html = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 25px; }
          .header { text-align: right; margin-bottom: 20px; }
          .grilla { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          .grilla th, .grilla td { border: 1px solid #ddd; padding: 8px; text-align: left; }
          .grilla th { background-color: #f2f2f2; }
          .summary { margin-top: 20px; }
          .summary div { display: flex; justify-content: space-between; margin-bottom: 5px; }
          .summary div span { font-weight: bold; }
        </style>
      </head>
      <body>
        <div class="header">
          <div>Número de Venta: ${venta.numeracion}</div>
          <div>Fecha: ${new Date(venta.fecha).toLocaleDateString()}</div>
          <div>Forma de Pago: ${venta.formaDePago}</div>
        </div>
  
        <table class="grilla">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Cantidad</th>
              <th>Precio Unitario</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${venta.productos
              .map(
                (producto) => `
              <tr>
                <td>${producto.productos.nombre}</td>
                <td>${producto.cantidad}</td>
                <td>${producto.precio.toFixed(2)}</td>
                <td>${producto.total.toFixed(2)}</td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
  
        <div class="summary">
          <div><span>Sub Total:</span> $${venta.subTotal.toFixed(2)}</div>
          <div><span>Bonificación (%):</span> ${venta.bonificacion || 0}%</div>
          <div><span>Total:</span> $${venta.total.toFixed(2)}</div>
        </div>
      </body>
      </html>
    `;

  // Selecciona Puppeteer según el entorno
  let browser;

  try {
    if (process.env.NODE_ENV === "development") {
      // En desarrollo (local), usa Puppeteer completo
      browser = await puppeteer.launch({
        headless: true, // O false si quieres depurar
      });
    } else {
      // En producción (servidor), usa la versión optimizada con Chromium de Sparticuz
      browser = await puppeteer.launch({
        executablePath: await chromium.executablePath(),
        args: [
          "--no-sandbox",
          "--disable-setuid-sandbox",
          "--disable-dev-shm-usage",
        ],
        headless: chromium.headless,
        timeout: 30000, // Aumentar el tiempo de espera a 30 segundos
      });
    }

    const page = await browser.newPage();

    // Cargar el contenido HTML
    await page.setContent(html);

    // Generar el PDF
    const pdfPath = `recibo_venta.pdf`; // Cambiar la ruta del PDF si es necesario
    const pdf = await page.pdf({
      path: pdfPath,
      format: "A4",
      printBackground: true,
    });

    await browser.close();

    return pdf; // Retorna la ruta del archivo generado
  } catch (error) {
    console.error("Error al generar el recibo de venta:", error);
    if (browser) {
      await browser.close(); // Cierra el navegador en caso de error
    }
  }
}
