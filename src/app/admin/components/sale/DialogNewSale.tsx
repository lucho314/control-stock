"use client";
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

import React, { useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export const DialogNewSale = ({ children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const [productos, setProductos] = useState([
    { codigo: "", nombre: "", precio: "", cantidad: "", total: "", iva: "" },
  ]);

  // Función para agregar una nueva fila de producto
  const agregarProducto = () => {
    setProductos([
      ...productos,
      { codigo: "", nombre: "", precio: "", cantidad: "", total: "", iva: "" },
    ]);
  };

  // Función para manejar cambios en la tabla de productos
  const handleProductoChange = (index, e) => {
    const { name, value } = e.target;
    const newProductos = [...productos];
    newProductos[index][name] = value;
    setProductos(newProductos);
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
                  <Input id="fecha" type="date" required />
                </div>
                <div>
                  <Label htmlFor="numeracion">Numeración</Label>
                  <Input
                    id="numeracion"
                    type="text"
                    className="w-full p-2 border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="formaPago">Forma de Pago</Label>
                  <select id="formaPago" className="w-full p-2 border" required>
                    <option value="efectivo">Efectivo</option>
                    <option value="tarjeta">Tarjeta</option>
                    <option value="transferencia">Transferencia</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Sección de Cliente */}
            <div className="py-4">
              <h2 className="text-lg font-bold">Datos del Cliente</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="razonSocial">Razón Social</Label>
                  <Input
                    id="razonSocial"
                    type="text"
                    className="w-full p-2 border"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="direccion">Dirección</Label>
                  <Input
                    id="direccion"
                    type="text"
                    className="w-full p-2 border"
                    required
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
            </div>

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
                    {productos.map((producto, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <Input
                            variant="sm"
                            name="codigo"
                            value={producto.codigo}
                            onChange={(e) => handleProductoChange(index, e)}
                            className="w-full p-2"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            variant="sm"
                            name="nombre"
                            value={producto.nombre}
                            onChange={(e) => handleProductoChange(index, e)}
                            className="w-full p-2"
                          />
                        </TableCell>
                        <TableCell>{producto.precio || "$0.00"}</TableCell>
                        <TableCell>
                          <Input
                            variant="sm"
                            name="cantidad"
                            value={producto.cantidad}
                            onChange={(e) => handleProductoChange(index, e)}
                            className="w-full p-2"
                          />
                        </TableCell>
                        <TableCell>$0.00</TableCell>
                        <TableCell>21%</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Resumen de Totales */}
            <div className="py-4">
              <h2 className="text-lg font-bold">Resumen</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="neto">Neto</Label>
                  <div id="neto" className="w-full p-1 border bg-gray-100">
                    $0.00
                  </div>
                </div>
                <div>
                  <Label htmlFor="subTotal">Sub Total</Label>
                  <div id="subTotal" className="w-full p-1 border bg-gray-100">
                    $0.00
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
                    $0.00
                  </div>
                </div>
                <div>
                  <Label htmlFor="total">Total</Label>
                  <div id="total" className="w-full p-1 border bg-gray-100">
                    $0.00
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
