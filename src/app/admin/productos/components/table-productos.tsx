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
          <TableHead>ID</TableHead>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Precio</TableHead>
          <TableHead>Stock</TableHead>
          <TableHead className="text-center">Acciones</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {productos.map((producto: any) => (
          <TableRow key={producto.id}>
            <TableCell>{producto.id}</TableCell>
            <TableCell>{producto.nombre}</TableCell>
            <TableCell>{producto.categoria}</TableCell>
            {/*<TableCell>${producto.precio.toFixed(2)}</TableCell>*/}
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
