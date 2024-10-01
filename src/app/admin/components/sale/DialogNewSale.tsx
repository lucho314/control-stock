"use client";
import { getProductByID } from "@/actions";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
import { useSaleStore } from "@/store/sale/sale-store";
import { Producto, sumarySale, type Venta } from "@/types";
import { FormaDePago } from "@prisma/client";

import React, { KeyboardEventHandler, useRef, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const DialogNewSale = ({ children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const cantidadInputRef = useRef<HTMLInputElement>(null);

  const {
    fecha,
    numeracion,
    subTotal,
    total,
    productItems,
    formaDePago,
    bonificacion,
  } = useSaleStore((state) => state.getSummaryInformation());

  const {
    setFormaDePago,
    setNumeracion,
    addProductToSale,
    updateBonificacion,
    updateProductQuantity,
  } = useSaleStore((state) => ({
    setFormaDePago: state.setFormaDePago,
    setNumeracion: state.setNumeration,
    addProductToSale: state.addProductToSale,
    updateBonificacion: state.updateBonificacion,
    updateProductQuantity: state.updateProductQuantity,
  }));

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setLoading(true);
      const input = e.target as HTMLInputElement;
      const value = input.value;
      const producto = await getProductByID(value);
      if (producto) {
        addProductToSale(producto);
        input.value = "";
        setLoading(false);

        // Focus on the quantity input despues de ml
        setTimeout(() => {
          cantidadInputRef.current?.focus();
        }, 200);
      }
    }
  };

  const handleProductQuantityChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    produc: Producto
  ) => {
    const value = e.target.value;
    const quantity = parseInt(value, 10);
    if (isNaN(quantity)) return;
    if (quantity === 0) return;

    updateProductQuantity(produc, quantity);
  };

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

    //console.log(sumarySale);
    await createSale(sumarySale);
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
          <form onSubmit={(e) => saveSale(e)}>
            {/* Sección de Información de Venta */}
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
                  />
                </div>
                <div>
                  <Label htmlFor="formaPago">Forma de Pago</Label>
                  <select
                    id="formaPago"
                    className="w-full p-2 border"
                    required
                    onChange={(e) =>
                      setFormaDePago(e.target.value as FormaDePago)
                    }
                  >
                    <option defaultValue="EFECTIVO">Efectivo</option>
                    <option defaultValue="TARJETA">Tarjeta</option>
                    <option defaultValue="TRANFERENCIA">Transferencia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sección de Cliente */}
            {/* <div className="py-4">
              <h2 className="text-lg font-bold">Datos del Cliente</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="razonSocial">Razón Social</Label>
                  <Input
                    id="razonSocial"
                    type="text"
                    className="w-full p-2 border"
                    required
                    defaultValue={venta.cliente.nombre!}
                  />
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    type="text"
                    className="w-full p-2 border"
                    defaultValue={venta.cliente.direccion!}
                  />
                </div>
                <div>
                  <Label htmlFor="cuit">CUIT</Label>
                  <Input
                    id="cuit"
                    type="text"
                    className="w-full p-2 border"
                    required
                  />
                </div>
              </div>
            </div> */}

            {/* Grilla de Productos */}
            <div className="py-4">
              <h2 className="text-lg font-bold">Productos</h2>
              <div className="overflow-y-scroll h-44">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Nombre </TableHead>
                      <TableHead>Precio </TableHead>
                      <TableHead>Cantidad </TableHead>
                      <TableHead>Total </TableHead>
                      {/* <TableHead>IVA </TableHead> */}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {productItems.map(
                      ({ producto, cantidad, total }, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <Input
                              variant="sm"
                              name="codigo"
                              defaultValue={producto.codigo_interno!}
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              variant="sm"
                              name="nombre"
                              defaultValue={producto.nombre!}
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>{producto.precio || "$0.00"}</TableCell>
                          <TableCell>
                            <Input
                              variant="sm"
                              name="cantidad"
                              defaultValue={cantidad}
                              ref={cantidadInputRef}
                              onChange={(e) =>
                                handleProductQuantityChange(e, producto)
                              }
                              type="number"
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>{total}</TableCell>
                          {/* <TableCell>21%</TableCell> */}
                        </TableRow>
                      )
                    )}

                    <TableRow>
                      <TableCell>
                        <Input
                          variant="sm"
                          name="codigo"
                          className="w-full p-2"
                          onKeyDown={handleKeydown}
                          loading={loading}
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          variant="sm"
                          name="nombre"
                          className="w-full p-2"
                        />
                      </TableCell>
                      <TableCell>$0.00</TableCell>
                      <TableCell>
                        <Input
                          variant="sm"
                          name="cantidad"
                          className="w-full p-2"
                          id="cantidad"
                        />
                      </TableCell>
                      <TableCell>$0.00</TableCell>
                      {/* <TableCell>21%</TableCell> */}
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Resumen de Totales */}
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
                {/* <div>
                  <Label htmlFor="iva">IVA</Label>
                  <div id="iva" className="w-full p-1 border bg-gray-100">
                    ${iva}
                  </div>
                </div> */}
                <div>
                  <Label htmlFor="total">Total</Label>
                  <div id="total" className="w-full p-1 border bg-gray-100">
                    ${total}
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button type="submit">Guardar Venta</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
