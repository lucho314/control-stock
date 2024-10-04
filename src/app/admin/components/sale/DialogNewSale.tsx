"use client";
import { createSale } from "@/actions/sale/create-sale";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useSaleStore } from "@/store/sale/sale-store";

import React, { useState } from "react";
import { HeadNewSale } from "./HeadNewSale";
import { GrillaProductoNewSale } from "./GrillaProductoNewSale";
import { TotalSumaryNewSale } from "./TotalSumaryNewSale";
import { sumarySale } from "@/types";
import { LoadingIcon } from "../icons/LoadingIcon";

interface Props {
  children?: React.ReactNode;
}

export const DialogNewSale = ({ children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [guardarVenta, setGuardarVenta] = useState(false);

  const formRef = React.useRef<HTMLFormElement>(null);
  const {
    fecha,
    numeracion,
    subTotal,
    total,
    productItems,
    formaDePago,
    bonificacion,
  } = useSaleStore((state) => state.getSummaryInformation());

  const { resetState } = useSaleStore((state) => ({
    resetState: state.resetState,
  }));

  const saveSale = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const sumarySale: sumarySale = {
      fecha,
      numeracion,
      subTotal,
      total,
      productItems,
      formaDePago,
      bonificacion,
    };

    setGuardarVenta(true);
    await createSale(sumarySale);
    setGuardarVenta(false);

    formRef.current?.reset();
    resetState();
    setIsDialogOpen(false);
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-7xl bg-white">
          <DialogHeader>
            <DialogTitle>Nueva venta</DialogTitle>
            <DialogDescription>
              Ingrese los detalles del la nueva venta aquí. Haga clic en guardar
              cuando termine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={(e) => saveSale(e)} ref={formRef}>
            {/* Sección de Información de Venta */}
            <HeadNewSale />

            {/* Sección de Cliente */}

            {/* Grilla de Productos */}
            <div className="py-4">
              <h2 className="text-lg font-bold">Productos</h2>
              <div className="overflow-y-scroll h-44">
                <GrillaProductoNewSale />
              </div>
            </div>

            {/* Resumen de Totales */}
            <TotalSumaryNewSale />

            <DialogFooter>
              {guardarVenta ? (
                <Button disabled>
                  <LoadingIcon />
                  Guardando...
                </Button>
              ) : (
                <Button type="submit">Guardar Venta</Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
