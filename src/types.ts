import {
  clientes,
  productos,
  proveedores,
  venta,
  venta_producto,
} from "@prisma/client";

export type Provider = Omit<proveedores, "id" | "activo"> & {
  id?: string;
};

export type Producto = Omit<productos, "id" | "precio"> & {
  id?: string;
  precio: number;
};

export type ProductoVenta = Omit<venta_producto, "id"> & {
  id?: string;
  producto: Producto;
};

export type Cliente = Partial<clientes>;

export type Venta = Omit<venta, "id"> & {
  id?: string;
  productos: ProductoVenta[];
  cliente: Cliente;
};
