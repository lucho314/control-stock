"use client";

import { useEffect, useState } from "react";
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

const colores = [
  { id: "Rojo", nombre: "Rojo" },
  { id: "Verde", nombre: "Verde" },
  { id: "Amarillo", nombre: "Amarillo" },
];

const productDefault = {
  id: null,
  nombre: "",
  categoria_id: "", // Asegúrate de que tenga un valor inicial
  precio: "0",
  stock: "0",
  codigo_de_barras: "",
  proveedor_id: "", // Asegúrate de que tenga un valor inicial
  peso: "0",
  tamano: "0",
  color: "",
  marca: "",
  imagen: "",
  codigo_interno: "",
  descripcion: "",
};

const createFormData = (nuevoProducto: any) => {
  const formData = new FormData();
  nuevoProducto.id && formData.append("id", nuevoProducto.id);
  formData.append("nombre", nuevoProducto.nombre);
  formData.append("categoria_id", nuevoProducto.categoria_id);
  formData.append("precio", nuevoProducto.precio);
  formData.append("stock", nuevoProducto.stock);
  formData.append("codigo_de_barras", nuevoProducto.codigo_de_barras);
  formData.append("proveedor_id", nuevoProducto.proveedor_id);
  formData.append("peso", nuevoProducto.peso);
  formData.append("tamano", nuevoProducto.tamano);
  formData.append("color", nuevoProducto.color);
  formData.append("marca", nuevoProducto.marca);
  formData.append("imagen", nuevoProducto.imagen);
  formData.append("codigo_interno", nuevoProducto.codigo_interno);
  formData.append("descripcion", nuevoProducto.descripcion);

  return formData;
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
  const [nuevoProducto, setNuevoProducto] = useState(
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
    const precio = parseFloat(nuevoProducto.precio) || 0;
    const stock = parseInt(nuevoProducto.stock) || 0;
    const peso = parseInt(nuevoProducto.peso) || 0;
    const tamano = parseInt(nuevoProducto.tamano) || 0;

    console.log({ ...nuevoProducto, precio, stock, peso, tamano });
    const { ok, product, error } = await createUpdateProduct(
      createFormData(nuevoProducto)
    );

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
              <Label htmlFor="precio">Precio</Label>
              <Input
                id="precio"
                type="number"
                value={nuevoProducto.precio || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    precio: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-3">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={nuevoProducto.stock || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    stock: e.target.value,
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
            <div className="sm:col-span-2">
              <Label htmlFor="peso">Peso</Label>
              <Input
                id="peso"
                type="number"
                value={nuevoProducto.peso || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    peso: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="tamano">Tamaño</Label>
              <Input
                id="tamano"
                type="number"
                value={nuevoProducto.tamano || ""}
                onChange={(e) =>
                  setNuevoProducto({
                    ...nuevoProducto,
                    tamano: e.target.value,
                  })
                }
              />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="color">Color</Label>
              <Select
                value={nuevoProducto.color || ""}
                onValueChange={(value) =>
                  setNuevoProducto({ ...nuevoProducto, color: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione un color" />
                </SelectTrigger>
                <SelectContent className="max-h-[400px]">
                  {colores.map((color: any) => (
                    <SelectItem key={color.id} value={color.id}>
                      {color.nombre}
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
