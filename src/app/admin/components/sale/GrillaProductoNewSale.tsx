import { getProductByID } from "@/actions";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSaleStore } from "@/store/sale/sale-store";
import { Producto } from "@/types";
import React, { KeyboardEventHandler, useRef, useState } from "react";

export const GrillaProductoNewSale = () => {
  const [loading, setLoading] = useState(false);
  const cantidadInputRef = useRef<HTMLInputElement>(null);
  const inputCodigoRef = useRef<HTMLInputElement>(null);
  const { productItems } = useSaleStore((state) =>
    state.getSummaryInformation()
  );

  const { addProductToSale, updateProductQuantity } = useSaleStore((state) => ({
    addProductToSale: state.addProductToSale,
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

  const handlerEnterQuantity = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLSelectElement>,
    produc: Producto
  ) => {
    if (e.key !== "Enter" && e.key !== "Tab") return;
    e.preventDefault();
    const input = e.target as HTMLInputElement;
    const value = input.value;

    const quantity = parseInt(value, 10);
    if (isNaN(quantity)) return;
    if (quantity === 0) return;

    updateProductQuantity(produc, quantity);
    inputCodigoRef.current?.focus();
  };

  return (
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
        {productItems.map(({ producto, cantidad, total }, index) => (
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
                onKeyDown={(e) => handlerEnterQuantity(e, producto)}
                type="number"
                className="w-full p-2"
              />
            </TableCell>
            <TableCell>{total}</TableCell>
            {/* <TableCell>21%</TableCell> */}
          </TableRow>
        ))}

        <TableRow>
          <TableCell>
            <Input
              variant="sm"
              name="codigo"
              className="w-full p-2"
              onKeyDown={handleKeydown}
              loading={loading}
              ref={inputCodigoRef}
            />
          </TableCell>
          <TableCell>
            <Input variant="sm" name="nombre" className="w-full p-2" />
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
  );
};
