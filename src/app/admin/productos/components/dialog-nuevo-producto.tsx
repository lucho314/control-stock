"use client";

import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import {
  getCategories,
  ICategory,
  getProviders,
  IProvider,
  createUpdateProduct,
} from "@/actions";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import { Textarea } from "@/components/ui/textarea";
import { Bounce, toast } from "react-toastify";
import { Producto } from "@/types";

const colores = [
  { id: "Rojo", nombre: "Rojo" },
  { id: "Verde", nombre: "Verde" },
  { id: "Amarillo", nombre: "Amarillo" },
];

const productDefault: Producto = {
  nombre: "",
  categoria_id: "",
  precio: null,
  precio_costo: null,
  porcentaje_ganancia: null,
  inStock: 0,
  proveedor_id: "",
  peso: null,
  tamano: null,
  color: "",
  marca: "",
  imagen: null,
  codigo_interno: "",
  descripcion: "",
};

interface PropsDialogNuevoProducto {
  children: React.ReactNode;
  producto?: any;
}

const DialogNuevoProducto = ({
  children,
  producto,
}: PropsDialogNuevoProducto) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState<Producto>(
    producto ?? productDefault
  );
  const [categorias, setCategorias] = useState<ICategory[]>([]);
  const [proveedores, setProveedores] = useState<IProvider[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriasData = await getCategories();
        const proveedoresData = await getProviders();
        setCategorias(categoriasData);
        setProveedores(proveedoresData);
      } catch (error) {
        console.error("Error: ", error);
      }
    };

    fetchData();
  }, []);

  const handleNuevoProducto = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ok, error } = await createUpdateProduct(nuevoProducto);

    if (!ok) {
      toast.error(error, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } else {
      setNuevoProducto(productDefault);
      setIsDialogOpen(false);
      toast.success("Producto registrado correctamente!", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  const calcularPrecioVentaAndPorcentaje = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || null;
    const whoChanged = e.target.id;

    setNuevoProducto((anterior) => ({ ...anterior, [whoChanged]: value }));

    if (!value) return;

    const { precio_costo, precio } = nuevoProducto;

    if (!precio_costo) return;

    if (whoChanged === "precio_costo" && precio) {
      setNuevoProducto({
        ...nuevoProducto,
        porcentaje_ganancia: +(((precio - value) / value) * 100).toFixed(2),
        [whoChanged]: value,
      });
      return;
    }

    if (whoChanged === "porcentaje_ganancia" && precio_costo) {
      console.log("porcentaje_ganancia", value);
      setNuevoProducto({
        ...nuevoProducto,
        precio: +(precio_costo + precio_costo * (value / 100)).toFixed(2),
        [whoChanged]: value,
      });
      return;
    }

    if (whoChanged === "precio" && precio_costo) {
      setNuevoProducto({
        ...nuevoProducto,
        porcentaje_ganancia: +(
          ((value - precio_costo) / precio_costo) *
          100
        ).toFixed(2),
        [whoChanged]: value,
      });
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[800px] md:max-w-[750px] bg-white overflow-y-scroll h-[700px]">
        <DialogHeader>
          <DialogTitle>Añadir Nuevo Producto</DialogTitle>
          <DialogDescription>
            Ingrese los detalles del nuevo producto aquí. Haga clic en guardar
            cuando termine.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleNuevoProducto}>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 py-4 sm:grid-cols-6">
            <div className="sm:col-span-full">
              <Label htmlFor="nombre">Nombre</Label>
              <Input
                id="nombre"
                value={nuevoProducto.nombre || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    nombre: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-full">
              <Label htmlFor="categoria">Categoria</Label>
              <Select
                value={nuevoProducto.categoria_id || ""}
                onValueChange={(value) =>
                  setNuevoProducto({ ...nuevoProducto, categoria_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione una categoria" />
                </SelectTrigger>
                <SelectContent className="h-[300px]">
                  {categorias.map((categoria: ICategory) => (
                    <SelectItem key={categoria.id} value={categoria.id}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="precio">Precio de costo</Label>
              <Input
                id="precio_costo"
                type="number"
                value={nuevoProducto.precio_costo?.toString() || ""}
                onChange={(e) => calcularPrecioVentaAndPorcentaje(e)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="stock">Porcentaje de ganancia</Label>
              <Input
                id="porcentaje_ganancia"
                type="number"
                value={nuevoProducto.porcentaje_ganancia?.toString() || ""}
                onChange={(e) => calcularPrecioVentaAndPorcentaje(e)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="stock">Precio de venta</Label>
              <Input
                id="precio"
                type="number"
                value={nuevoProducto.precio?.toString() || ""}
                onChange={(e) => calcularPrecioVentaAndPorcentaje(e)}
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="inStock"
                type="number"
                value={nuevoProducto.inStock?.toString() || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    inStock: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="sm:col-span-full">
              <Label htmlFor="codigo_de_barras">Codigo de barras</Label>
              <Input
                id="codigo_de_barras"
                value={nuevoProducto.codigo_de_barras || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    codigo_de_barras: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-full">
              <Label htmlFor="proveedor">Proveedor</Label>
              <Select
                value={nuevoProducto.proveedor_id || ""}
                onValueChange={(value) =>
                  setNuevoProducto({ ...nuevoProducto, proveedor_id: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un proveedor" />
                </SelectTrigger>
                <SelectContent className="h-[300px]">
                  {proveedores.map((proveedor: IProvider) => (
                    <SelectItem key={proveedor.id} value={proveedor.id}>
                      {proveedor.nombre} ( {proveedor.direccion} )
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-3">
              <Label htmlFor="marca">Marca</Label>
              <Input
                id="marca"
                type="text"
                value={nuevoProducto.marca || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    marca: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="codigo_interno">Codigo interno</Label>
              <Input
                id="codigo_interno"
                type="text"
                value={nuevoProducto.codigo_interno || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    codigo_interno: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-full">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea
                id="descripcion"
                value={nuevoProducto.descripcion || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    descripcion: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-full">
              <Label htmlFor="imagen">URL Imagen</Label>
              <Input
                id="imagen"
                type={
                  nuevoProducto.imagen && nuevoProducto.imagen.includes("http")
                    ? "url"
                    : "text"
                }
                value={nuevoProducto.imagen || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    imagen: e.target.value,
                  })
                }
              />
            </div>
            {nuevoProducto.imagen && nuevoProducto.imagen.includes("http") && (
              <div className="sm:col-span-full flex justify-center border-dotted border-2 border-black">
                <Image
                  src={nuevoProducto.imagen}
                  alt="Vista previa del producto"
                  width={200}
                  height={200}
                  className="rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button type="submit">Guardar Producto</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogNuevoProducto;
