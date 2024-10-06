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
import { useUiStore } from "@/store/ui/ui-store";
import { productos } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { use, useState } from "react";
import { enterAsTab } from "@/utils/enterAsTab";
import { searchProducts } from "@/actions/product/searchProducts";
import { useSaleStore } from "@/store/sale/sale-store";

interface ProductSearchCriteria {
  codigo?: string;
  nombre?: string;
  proveedor?: string;
  rubro?: string;
  marca?: string;
  peso?: number;
}

export const FindProductDialog = () => {
  const { findProductOpen, closeFindProduct } = useUiStore();
  const [productos, setProductos] = useState<productos[]>([]);
  const [searchCriteria, setSearchCriteria] = useState<ProductSearchCriteria>(
    {}
  );

  const { addProductToSale } = useSaleStore();

  const handlerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchCriteria({
      ...searchCriteria,
      [e.target.id]: e.target.value,
    });
  };

  const findProducts = async () => {
    const productos = await searchProducts(searchCriteria);
    setProductos(productos);
  };

  const selectProduct = (producto: productos) => {
    addProductToSale(producto);
    setSearchCriteria({});
    setProductos([]);
    closeFindProduct();
  };

  return (
    <Dialog open={findProductOpen} onOpenChange={closeFindProduct}>
      <DialogTrigger></DialogTrigger>
      <DialogContent className="sm:max-w-7xl bg-white">
        <DialogHeader>
          <DialogTitle>Busueda avanzada</DialogTitle>
          <DialogDescription>Busqueda avanzada de productos</DialogDescription>
          <div className="flex flex-1 space-x-6 items-center">
            <div className="flex-grow w-4/5">
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1">
                  <Label htmlFor="fecha">Codigo del producto</Label>
                  <Input
                    id="codigo"
                    type="text"
                    tabIndex={11}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
                <div className="col-span-4">
                  <Label htmlFor="fecha">Nombre del producto</Label>
                  <Input
                    id="nombre"
                    type="text"
                    tabIndex={12}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                  <Label htmlFor="fecha">Proveedor</Label>
                  <Input
                    id="proveedor"
                    type="text"
                    tabIndex={13}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="fecha">Rubro</Label>
                  <Input
                    id="rubro"
                    type="text"
                    tabIndex={14}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
              </div>
              <div className="grid grid-cols-5 gap-4">
                <div className="col-span-3">
                  <Label htmlFor="fecha">Marca</Label>
                  <Input
                    id="marca"
                    type="text"
                    tabIndex={15}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
                <div className="col-span-2">
                  <Label htmlFor="fecha">Peso</Label>
                  <Input
                    id="peso"
                    type="text"
                    tabIndex={16}
                    onChange={handlerChange}
                    onKeyDown={enterAsTab}
                  />
                </div>
              </div>
            </div>

            <aside className="w-1/5">
              <Button
                className="min-h-20 min-w-28 mt-5"
                tabIndex={17}
                onClick={findProducts}
              >
                Buscar
              </Button>
            </aside>
          </div>
          <Table className="mt-5 mb-8">
            <TableHeader>
              <TableRow>
                <TableHead>Código</TableHead>
                <TableHead>Nombre </TableHead>
                <TableHead>Precio </TableHead>
                <TableHead>Stock </TableHead>
                <TableHead> </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {productos.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="flex justify-center items-center">
                      No se encontraron productos
                    </div>
                  </TableCell>
                </TableRow>
              ) : (
                productos.map((producto: productos, index: number) => (
                  <TableRow key={index}>
                    <TableCell>{producto.codigo_interno!}</TableCell>
                    <TableCell>
                      {producto.nombre?.toUpperCase() || "Sin nombre"}
                    </TableCell>
                    <TableCell>
                      {producto.precio?.toString() || "$0.00"}
                    </TableCell>
                    <TableCell>{producto.inStock?.toString() || "0"}</TableCell>
                    <TableCell>
                      <Button
                        variant={"success"}
                        onClick={(e) => selectProduct(producto)}
                      >
                        Seleccionar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
