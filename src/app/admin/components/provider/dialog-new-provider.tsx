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

import { createUpdateProvider } from "@/actions";
import { type Provider } from "@/types";
import { Bounce, toast } from "react-toastify";
import { useFormState } from "react-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { providerSchema } from "@/schemas/provider-schema";

interface Props {
  provider?: Provider;
  children?: React.ReactNode;
}
const initialState = { message: null, error: {} };
const Dialogprovider = ({ provider, children }: Props) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [state, dispatch] = useFormState(createUpdateProvider, initialState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(providerSchema),
  });

  const title = provider ? "Editar Proveedor" : "Añadir Nuevo Proveedor";

  useEffect(() => {
    if (state?.message === "successfully") {
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
    }
  }, [state]);

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
          <form action={dispatch}>
            <div className="grid gap-4 py-4">
              <div className="sm:col-span-6">
                <Label htmlFor="nombre" className="text-right">
                  Nombre
                </Label>

                <Input
                  id="nombre"
                  name="nombre"
                  defaultValue={provider?.nombre || ""}
                  className="col-span-3"
                />
                {state?.errors?.nombre && (
                  <span className="mt-2  text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {state.errors.nombre.at(0)}
                  </span>
                )}
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="telefono" className="text-right">
                  Telefono
                </Label>
                <Input
                  id="telefono"
                  name="telefono"
                  type="tel"
                  className="col-span-3"
                  defaultValue={provider?.telefono || ""}
                />
                {state?.errors?.telefono && (
                  <span className="mt-2  text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {state.errors.telefono.at(0)}
                  </span>
                )}
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  className="col-span-3"
                  defaultValue={provider?.email || ""}
                />
                {state?.errors?.email && (
                  <span className="mt-2  text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {state.errors.email.at(0)}
                  </span>
                )}
              </div>
              <div className="sm:col-span-6">
                <Label htmlFor="direccion" className="text-right">
                  Direccion
                </Label>
                <Input
                  id="direccion"
                  name="direccion"
                  type="text"
                  defaultValue={provider?.direccion || ""}
                  className="col-span-3"
                />
                {state?.errors?.direccion && (
                  <span className="mt-2  text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                    {state.errors.direccion.at(0)}
                  </span>
                )}
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

export default Dialogprovider;
