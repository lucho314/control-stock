"use client";
import { getProductByID } from "@/actions";
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
import { type Venta } from "@/types";

import React, { KeyboardEventHandler, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

const defaultVenta: Venta = {
  id: "",
  numeracion: "",
  fecha: new Date(),
  numero: "",
  formaDePago: "EFECTIVO",
  clienteId: "",
  neto: 0,
  subTotal: 0,
  bonificacion: null,
  iva: 0,
  total: 0,
  cliente: {
    nombre: "generico",
    direccion: "generico",
    email: "",
    telefono: "",
  },
  productos: [],
};

export const DialogNewSale = ({ children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { fecha, numeracion, subTotal, iva, total, productItems } =
    useSaleStore((state) => state.getSummaryInformation());

  const addProductToSale = useSaleStore((state) => state.addProductToSale);

  const handleKeydown: KeyboardEventHandler<HTMLInputElement> = async (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      const value = input.value;
      const producto = await getProductByID(value);
      if (producto) {
        addProductToSale(producto);
        input.value = "";
      }
    }
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
          <form>
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
                  />
                </div>
                <div>
                  <Label htmlFor="formaPago">Forma de Pago</Label>
                  <select id="formaPago" className="w-full p-2 border" required>
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
                      <TableHead>IVA </TableHead>
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
                              onChange={(e) => handleProductoChange(index, e)}
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>
                            <Input
                              variant="sm"
                              name="nombre"
                              defaultValue={producto.nombre!}
                              onChange={(e) => handleProductoChange(index, e)}
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>{producto.precio || "$0.00"}</TableCell>
                          <TableCell>
                            <Input
                              variant="sm"
                              name="cantidad"
                              defaultValue={cantidad}
                              onChange={(e) => handleProductoChange(index, e)}
                              className="w-full p-2"
                            />
                          </TableCell>
                          <TableCell>{total}</TableCell>
                          <TableCell>21%</TableCell>
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
                        />
                      </TableCell>
                      <TableCell>$0.00</TableCell>
                      <TableCell>21%</TableCell>
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
                  <Label htmlFor="bonificacion">Bonificación</Label>
                  <Input
                    id="bonificacion"
                    type="text"
                    className="w-full p-1 border"
                  />
                </div>
                <div>
                  <Label htmlFor="iva">IVA</Label>
                  <div id="iva" className="w-full p-1 border bg-gray-100">
                    ${iva}
                  </div>
                </div>
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
