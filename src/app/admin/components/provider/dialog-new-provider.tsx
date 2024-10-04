"use client";

import { useState } from "react";
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

import { createUpdateProvider } from "@/actions";
import { type Provider } from "@/types";
import { Bounce, toast } from "react-toastify";

const defaultProvider: Provider = {
  nombre: "",
  telefono: "",
  email: "",
  direccion: "",
};

interface Props {
  provider?: Provider;
  children?: React.ReactNode;
}

const DialogNewProvider = ({ provider, children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newProvider, setNewProvider] = useState<Provider>(
    provider ?? defaultProvider
  );

  const title = provider ? "Editar Proveedor" : "Añadir Nuevo Proveedor";

  const handleNuevoProducto = async (e: React.FormEvent) => {
    e.preventDefault();

    const { ok, message } = await createUpdateProvider(newProvider);

    if (!ok) {
      return alert("Error al guardar el proveedor");
    }
    setIsDialogOpen(false);

    toast.success("Proveedor registrado correctamente!", {
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
  };

  return (
    <>
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
            <DialogDescription>
              Ingrese los detalles del nuevo proveedor aquí. Haga clic en
              guardar cuando termine.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleNuevoProducto}>
            <div className="grid gap-4 py-4">
              <div className="sm:col-span-6">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>

                <Input
                  id="nombre"
                  required
                  value={newProvider.nombre || ""}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewProvider({ ...newProvider, nombre: e.target.value });
                  }}
                />
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="telefono" className="text-right">
                  Telefono
                </Label>
                <Input
                  id="telefono"
                  type="tel"
                  className="col-span-3"
                  value={newProvider.telefono || ""}
                  onChange={(e) => {
                    setNewProvider({
                      ...newProvider,
                      telefono: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  className="col-span-3"
                  value={newProvider.email || ""}
                  type="email"
                  onChange={(e) => {
                    setNewProvider({ ...newProvider, email: e.target.value });
                  }}
                />
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="direccion" className="text-right">
                  Direccion
                </Label>
                <Input
                  id="direccion"
                  type="text"
                  value={newProvider.direccion || ""}
                  className="col-span-3"
                  onChange={(e) => {
                    setNewProvider({
                      ...newProvider,
                      direccion: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Guardar Producto</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DialogNewProvider;
