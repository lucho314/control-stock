import {
  clientes,
  FormaDePago,
  productos,
  proveedores,
  venta,
  venta_producto,
} from "@prisma/client";

export type Provider = Omit<
  proveedores,
  "id" | "activo" | "created_by" | "created_at" | "updated_at" | "updated_by"
> & {
  id?: string;
};

export type Producto = Omit<
  productos,
  | "id"
  | "precio"
  | "precio_costo"
  | "porcentaje_ganancia"
  | "codigo_de_barras"
  | "created_by"
  | "created_at"
  | "updated_at"
  | "updated_by"
> & {
  id?: string;
  precio: number | null;
  precio_costo: number | null;
  porcentaje_ganancia: number | null;
  codigo_de_barras?: string | null;
};

export type ProductoVenta = Omit<venta_producto, "id"> & {
  id?: string;
  producto: Producto;
};

export type Cliente = Partial<clientes>;

export type Venta = Omit<
  venta,
  "id" | "created_by" | "created_at" | "updated_at" | "updated_by"
> & {
  id?: string;
  productos: ProductoVenta[];
  cliente: Cliente;
};

export type sumarySale = {
  fecha: Date;
  numeracion: string;
  subTotal: number;
  total: number;
  productItems: ProductoVenta[];
  formaDePago: FormaDePago;
  bonificacion: number | null;
};
