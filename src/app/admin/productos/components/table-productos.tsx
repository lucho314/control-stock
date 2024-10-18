"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Edit, Trash2 } from "lucide-react";
import AlertDialogComponent from "./alert-dialog";
import DialogNuevoProducto from "./dialog-nuevo-producto";
import Image from "next/image";

interface TableProductosProps {
  productos: any;
  deleteProduct?: (id: string) => void;
}

const TableProductos = ({ productos, deleteProduct }: TableProductosProps) => {
  const handleEliminarProducto = (id: string) => {
    console.log(id);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-72">Nombre</TableHead>
          <TableHead className="w-96">Descripcion</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Proveedor</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto: any) => (
          <TableRow key={producto.id}>
            <TableCell>
              {producto.imagen && producto.imagen.startsWith("http") ? (
                <Image
                  src={producto.imagen}
                  alt={producto.descripcion}
                  width={60}
                  height={60}
                  className="w-16 h-14 object-cover rounded-full"
                />
              ) : null}
            </TableCell>
            <TableCell className="text-xs">{producto.nombre}</TableCell>
            <TableCell className="text-xs">{producto.descripcion}</TableCell>
            <TableCell>{producto.categoria?.nombre}</TableCell>
            <TableCell>{producto.proveedores.nombre}</TableCell>
            <TableCell>${producto.precio}</TableCell>
            <TableCell>{producto.inStock}</TableCell>
            <TableCell className="flex justify-evenly">
              <DialogNuevoProducto producto={producto}>
                <Button variant="secondary" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
              </DialogNuevoProducto>
              {/*<Button
                variant="destructive"
                size="icon"
                onClick={() => deleteProduct(producto.id)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>*/}
              <AlertDialogComponent
                producto={producto}
                productoEliminado={handleEliminarProducto}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableProductos;
