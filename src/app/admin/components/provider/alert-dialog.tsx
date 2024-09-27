"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { deleteProductImage, deleteProvider } from "@/actions";
import { Provider } from "@/types";

interface Props {
  provider: Provider;
}

const AlertDialogComponent = (props: Props) => {
  const { provider } = props;
  const [providerAEliminar, setproviderAEliminar] = useState<string | null>(
    null
  );

  const handleEliminarProvider = async () => {
    if (providerAEliminar !== null) {
      await deleteProvider(providerAEliminar);
      setproviderAEliminar(null);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="icon"
          onClick={() => setproviderAEliminar(provider.id!)}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>¿Está seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el
            proveedor
            {provider.nombre} y lo quitará de nuestros servidores.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setproviderAEliminar(null)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleEliminarProvider}>
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogComponent;
