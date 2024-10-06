import { Producto, ProductoVenta, sumarySale, Venta } from "@/types";
import { FormaDePago } from "@prisma/client";
import { create } from "zustand";

interface State {
  sale: Venta;

  addProductToSale: (product: any) => void;
  removeProductFromSale: (product: any) => void;
  updateProductQuantity: (product: any, quantity: number) => void;
  setNumeration: (numeration: string) => void;
  setFormaDePago: (formaDePago: FormaDePago) => void;
  getSummaryInformation: () => sumarySale;

  updateBonificacion: (bonificacion: number) => void;

  resetState: () => void;
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

    const { fecha, numeracion, bonificacion, formaDePago } = sale;
    const { total, subTotal } = calcullarTotales(
      sale.productos,
      bonificacion || 0
    );

    const productItems = sale.productos;

    return {
      fecha,
      numeracion,
      subTotal,
      total,
      productItems,
      formaDePago,
      bonificacion,
    };
  },

  setNumeration: (numeracion: string) => {
    const { sale } = get();

    set({
      sale: {
        ...sale,
        numeracion,
      },
    });
  },
  setFormaDePago: (formaDePago: FormaDePago) => {
    const { sale } = get();

    set({
      sale: {
        ...sale,
        formaDePago,
      },
    });
  },

  updateBonificacion: (bonificacion: number) => {
    const { sale } = get();

    set({
      sale: {
        ...sale,
        bonificacion,
      },
    });
  },

  resetState: () => {
    set({
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
    });
  },
}));

function calcullarTotales(productos: ProductoVenta[], bonificacion: number) {
  const subTotal = +productos
    .reduce((acc, p) => Number(acc) + Number(p.total), 0)
    .toFixed(2);
  let total = +Number(subTotal).toFixed(2);

  if (bonificacion) {
    total = +(total - (total * bonificacion) / 100).toFixed(2);
  }

  return {
    subTotal,
    total,
  };
}
