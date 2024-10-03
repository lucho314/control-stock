"use client";
import { Button } from "@/components/ui/button";
import { Edit, ReceiptText } from "lucide-react";
import { venta } from "@prisma/client";
import { generarReciboDeVenta } from "@/reportes/generarReciboDeVenta";
import { useState } from "react";
import {Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { tree } from "next/dist/build/templates/app-page";
type Porps = {
  sale: venta;
};

export const ButtonActionTableSale = ({ sale }: Porps) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const generatePdf = async () => {
    try {
      const response = await fetch(`/api/reporte-venta?ventaId=${sale.id}`);
      if (!response.ok) {
        throw new Error('Error al generar el PDF');
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      setPdfUrl(url); 
      setIsDialogOpen(true);
    } catch (error) {
      console.error(error);
    }

  }




  return (
    <div className="flex space-x-3">
      <Button variant="ghost" size="icon" title="Editar Venta">
        <Edit className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" title="Ver Detalles" onClick={()=>generatePdf()}>
        <ReceiptText className="h-4 w-4" />
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-6xl flex flex-col  bg-white">
          <DialogHeader>
            <DialogTitle>Nueva venta</DialogTitle>
            </DialogHeader>
            <div className="flex flex-1 justify-center">
                <embed src={pdfUrl!} width="1000" height="800" type="application/pdf" />
            </div>
               
          </DialogContent>
      </Dialog>
    </div>
  );
};
