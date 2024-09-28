import { Producto, ProductoVenta, Venta } from "@/types";
import { create } from "zustand";

interface State {
  sale: Venta;

  addProductToSale: (product: any) => void;
  removeProductFromSale: (product: any) => void;
  updateProductQuantity: (product: any, quantity: number) => void;
  getSummaryInformation: () => {
    fecha: Date;
    numeracion: string;
    subTotal: number;
    iva: number;
    total: number;
    productItems: ProductoVenta[];
  };
}

export const useSaleStore = create<State>()((set, get) => ({
  sale: {
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
  },
  addProductToSale: (product: Producto) => {
    const { sale } = get();

    const producVenta: ProductoVenta = {
      id: "",
      ventaId: "",
      productoId: "",
      cantidad: 1,
      precio: 0,
      iva: 21,
      total: product.precio,
      producto: product,
    };

    set({
      sale: {
        ...sale,
        productos: [...sale.productos, producVenta],
      },
    });
  },
  removeProductFromSale: (product: Producto) => {
    const { sale } = get();

    const productos = sale.productos.filter(
      (p) => p.producto.id !== product.id
    );

    set({
      sale: {
        ...sale,
        productos,
      },
    });
  },
  updateProductQuantity: (product: Producto, quantity: number) => {
    const { sale } = get();

    const productos = sale.productos.map((p) => {
      const { producto } = p;

      if (p.producto.id === product.id) {
        return {
          ...p,
          cantidad: quantity,
          total: quantity * Number(producto.precio),
        };
      }
      return p;
    });

    set({
      sale: {
        ...sale,
        productos,
      },
    });
  },
  getSummaryInformation: () => {
    const { sale } = get();

    const { fecha, numeracion } = sale;
    const { total, subTotal, iva } = calcullarTotales(sale.productos);

    const productItems = sale.productos;

    return {
      fecha,
      numeracion,
      subTotal,
      iva,
      total,
      productItems,
    };
  },
}));

function calcullarTotales(productos: ProductoVenta[]) {
  const subTotal = +productos
    .reduce((acc, p) => Number(acc) + Number(p.total), 0)
    .toFixed(2);
  const iva = +productos
    .reduce(
      (acc, p) => Number(acc) + (Number(p.iva) * Number(p.total)) / 100,
      0
    )
    .toFixed(2);
  const total = +(Number(subTotal) + Number(iva)).toFixed(2);

  return {
    subTotal,
    iva,
    total,
  };
}
