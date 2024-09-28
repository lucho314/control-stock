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

    const subTotal = +(
      Number(sale.subTotal) + Number(producVenta.total)
    ).toFixed(2);
    const iva = +(
      Number(sale.iva) +
      (Number(producVenta.iva) * producVenta.total) / 100
    ).toFixed(2);
    const total = +(subTotal + iva).toFixed(2);

    set({
      sale: {
        ...sale,
        subTotal,
        iva,
        total,
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
      if (p.producto.id === product.id) {
        return {
          ...p,
          cantidad: quantity,
          total: quantity * p.precio,
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

    const { fecha, numeracion, total, subTotal, iva } = sale;

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
