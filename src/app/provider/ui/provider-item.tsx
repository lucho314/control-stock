"use client";

import { deleteProvider } from "@/actions";

interface Props {
  provider: {
    id: string;
    nombre: string | null;
    contacto: string | null;
    direccion: string | null;
  };
}

export const ProviderItem = ({ provider }: Props) => {
  return (
    <div>
      <li>{provider.nombre}</li>
      <button
        type="button"
        onClick={() => deleteProvider(provider.id)}
        className="btn-danger w-full rounded-b-xl"
      >
        Eliminar
      </button>
    </div>
  );
};
