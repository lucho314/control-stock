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
import { useUiStore } from "@/store/ui/ui-store";
import { useState } from "react";

export const FindProductDialog = () => {
  const { findProductOpen, closeFindProduct } = useUiStore();

  return (
    <Dialog open={findProductOpen} onOpenChange={closeFindProduct}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="sm:max-w-7xl bg-white">
        <DialogHeader>
          <DialogTitle>Nueva venta</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del la nueva venta aquí. Haga clic en guardar
            cuando termine.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button>Vemos</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
