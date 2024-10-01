import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSaleStore } from "@/store/sale/sale-store";
import React from "react";

export const TotalSumaryNewSale = () => {
  const { subTotal, total, bonificacion } = useSaleStore((state) =>
    state.getSummaryInformation()
  );

  const { updateBonificacion } = useSaleStore((state) => ({
    updateBonificacion: state.updateBonificacion,
  }));

  return (
    <div>
      <div className="py-4">
        <h2 className="text-lg font-bold">Resumen</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="subTotal">Sub Total</Label>
            <div id="subTotal" className="w-full p-1 border bg-gray-100">
              ${subTotal}
            </div>
          </div>
          <div>
            <Label htmlFor="bonificacion">% Bonificación</Label>
            <Input
              id="bonificacion"
              type="number"
              className="w-full p-1 border"
              defaultValue={bonificacion || ""}
              onChange={(e) => updateBonificacion(+e.target.value)}
            />
          </div>

          <div>
            <Label htmlFor="total">Total</Label>
            <div id="total" className="w-full p-1 border bg-gray-100">
              ${total}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
