"use client";
import { Button } from "@/components/ui/button";
import { Edit, ReceiptText } from "lucide-react";
import { venta } from "@prisma/client";
type Porps = {
  sale: venta;
};

export const ButtonActionTableSale = ({ sale }: Porps) => {
  return (
    <div className="flex space-x-3">
      <Button variant="ghost" size="icon" title="Editar Venta">
        <Edit className="h-4 w-4" />
      </Button>

      <Button variant="ghost" size="icon" title="Ver Detalles">
        <ReceiptText className="h-4 w-4" />
      </Button>
    </div>
  );
};
