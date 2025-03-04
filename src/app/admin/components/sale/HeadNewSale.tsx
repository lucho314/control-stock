import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaleStore } from "@/store/sale/sale-store";
import { FormaDePago } from "@prisma/client";
import React from "react";

export const HeadNewSale = () => {
  const { fecha, numeracion } = useSaleStore((state) =>
    state.getSummaryInformation()
  );

  const { setFormaDePago, setNumeracion } = useSaleStore((state) => ({
    setFormaDePago: state.setFormaDePago,
    setNumeracion: state.setNumeration,
  }));

  const enterAsTab = (e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log(e.key);
    if (e.key === "Enter") {
      console.log(e.key);
    if (e.key === "Enter") {
      e.preventDefault();

      const focusableElements = Array.from(document.querySelectorAll('input, select, textarea'));
      const currentIndex = focusableElements.indexOf(e.currentTarget);
      const nextElement = focusableElements[currentIndex + 1];

      if (nextElement) {
        (nextElement as HTMLElement).focus();
      }
    }
    }
  }
  return (
    <div className="py-4">
      <h2 className="text-lg font-bold">Información de la Venta</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <Label htmlFor="fecha">Fecha</Label>
          <Input
            id="fecha"
            type="date"
            required
            defaultValue={fecha.toISOString().slice(0, 10)}
            onKeyDown={enterAsTab}
            tabIndex={1}
          />
        </div>
        <div>
          <Label htmlFor="numeracion">Numeración</Label>
          <Input
            id="numeracion"
            type="text"
            className="w-full p-2 border"
            required
            defaultValue={numeracion}
            autoFocus
            onChange={(e) => setNumeracion(e.target.value)}
            onKeyDown={enterAsTab}
            tabIndex={2}
          />
        </div>
        <div>
          <Label htmlFor="formaPago">Forma de Pago</Label>
          <select
            id="formaPago"
            className="w-full p-2 border"
            required
            onChange={(e) => setFormaDePago(e.target.value as FormaDePago)}
            onKeyDown={enterAsTab}
            tabIndex={3}
          >
            <option defaultValue="EFECTIVO">Efectivo</option>
            <option defaultValue="TARJETA">Tarjeta</option>
            <option defaultValue="TRANFERENCIA">Transferencia</option>
          </select>
        </div>
      </div>
    </div>
  );
};
